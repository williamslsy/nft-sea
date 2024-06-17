'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { RiWallet3Line } from 'react-icons/ri';
import { TfiAngleRight } from 'react-icons/tfi';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useConnect, Connector } from 'wagmi';
import metamaskLogo from '../../public/wolf.svg';
import coinbaseLogo from '../../public/coinbase-logo.svg';
import walletConnectLogo from '../../public/wallet-connect-logo.svg';

interface WalletOptionsProps {
  MetaMask: typeof metamaskLogo;
  'Coinbase Wallet': typeof coinbaseLogo;
  WalletConnect: typeof walletConnectLogo;
}

export function WalletOptions() {
  const { connect, connectors } = useConnect();
  const logos: WalletOptionsProps = {
    MetaMask: metamaskLogo,
    'Coinbase Wallet': coinbaseLogo,
    WalletConnect: walletConnectLogo,
  };

  const handleConnect = (connector: Connector) => {
    try {
      connect({ connector });
    } catch (error) {
      console.error('Failed to connect:', error instanceof Error ? error.message : String(error));
    }
  };

  const [walletAvailability, setWalletAvailability] = useState<WalletOptionsProps | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const availability = {
        MetaMask: typeof (window as any).ethereum !== 'undefined' && (window as any).ethereum.isMetaMask === true,
        'Coinbase Wallet': typeof (window as any).ethereum !== 'undefined' && (window as any).ethereum.isCoinbaseWallet === true,
        WalletConnect: false, // WalletConnect does not install anything in the browser
      };
      setWalletAvailability(availability);
    }
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <RiWallet3Line className="text-3xl text-white" />
      </SheetTrigger>
      <SheetContent className="bg-black border-0 p-4 text-white">
        <SheetHeader className="mb-4">
          <SheetTitle className="font-medium text-2xl text-white">Connect Your Wallet</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          {connectors.map((connector, index) => (
            <Button
              key={index}
              className="flex items-center justify-between px-6 py-6 rounded-lg bg-[#282828] hover:bg-[#333333] cursor-pointer text-white transition-colors duration-200 ease-in-out"
              onClick={() => handleConnect(connector)}
            >
              <div className="flex items-center gap-4">
                <Image src={logos[connector.name as keyof WalletOptionsProps]} alt={connector.name} width={25} height={25} />
                <span className="text-lg font-medium">{connector.name}</span>
              </div>
              {walletAvailability && walletAvailability[connector.name as keyof WalletOptionsProps] && <p className="px-3 py-1 bg-blue-600 rounded-full text-xs font-medium">Installed</p>}
              <TfiAngleRight className="text-xl" />
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
