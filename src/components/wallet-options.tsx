import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { RiWallet3Line } from 'react-icons/ri';
import { TfiAngleRight } from 'react-icons/tfi';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useConnect, Connector, useSwitchChain } from 'wagmi';
import metamaskLogo from '../../public/wolf.svg';
import coinbaseLogo from '../../public/coinbase-logo.svg';
import walletConnectLogo from '../../public/wallet-connect-logo.svg';
import { sepolia } from 'wagmi/chains';
import { wagmiConfig } from '@/lib/config';

interface WalletOptionsProps {
  MetaMask: typeof metamaskLogo;
  'Coinbase Wallet': typeof coinbaseLogo;
  WalletConnect: typeof walletConnectLogo;
}

const logos: WalletOptionsProps = {
  MetaMask: metamaskLogo,
  'Coinbase Wallet': coinbaseLogo,
  WalletConnect: walletConnectLogo,
};
const walletPriority = ['MetaMask', 'Coinbase Wallet', 'WalletConnect'];

export function WalletOptions() {
  const { chains, switchChain } = useSwitchChain();
  const { connect, connectors, reset } = useConnect();
  const [walletAvailability, setWalletAvailability] = useState({
    MetaMask: false,
    'Coinbase Wallet': false,
    WalletConnect: false,
  });

  useEffect(() => {
    reset();
    if (typeof window !== 'undefined') {
      setWalletAvailability({
        MetaMask: Boolean(window.ethereum && window.ethereum.isMetaMask),
        'Coinbase Wallet': false,
        WalletConnect: false,
      });
    }
  }, [reset]);

  const [filteredConnectors, setFilteredConnectors] = useState<Connector[]>([]);

  useEffect(() => {
    const uniqueConnectors = connectors.filter((c, index, self) => index === self.findIndex((t) => t.id === c.id));

    const sortedConnectors = uniqueConnectors.sort((a, b) => walletPriority.indexOf(a.name) - walletPriority.indexOf(b.name));
    setFilteredConnectors(sortedConnectors);
  }, [connectors]);

  const handleConnect = (connector: Connector) => {
    try {
      connect({ connector });
    } catch (error) {
      console.error('Failed to connect:', error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex items-center gap-2" variant="cta">
          <RiWallet3Line className="text-xl text-white" />
          Connect Wallet{' '}
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-black border-0 p-4 text-white">
        <SheetHeader className="mb-6 text-left">
          <SheetTitle className="font-medium text-white">Connect Your Wallet</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          {filteredConnectors.map((connector, index) => (
            <Button
              key={index}
              className="flex items-center justify-between p-6 rounded-lg bg-[#282828] hover:bg-[#333333] cursor-pointer text-white transition-colors duration-200 ease-in-out w-72 mb-2"
              onClick={() => handleConnect(connector)}
            >
              <div className="flex items-center gap-4">
                <Image src={logos[connector.name as keyof WalletOptionsProps]} alt={connector.name} width={25} height={25} />
                <span className="text-lg font-medium">{connector.name}</span>
                {walletAvailability[connector.name as keyof typeof walletAvailability] && <p className="px-3 py-1 bg-blue-600 rounded-full text-xs font-medium">Installed</p>}
              </div>
              <TfiAngleRight className="text-sm" />
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
