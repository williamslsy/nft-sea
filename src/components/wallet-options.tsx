'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { RiWallet3Line } from 'react-icons/ri';
import { TfiAngleRight } from 'react-icons/tfi';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

// Example connector objects, adjust according to actual implementation
const Metamask = {
  name: 'Metamask',
  logo: '/wolf.svg', // Ensure you have this logo in your public directory
  connect: () => console.log('Connecting to Metamask...'),
};

const CoinbaseWallet = {
  name: 'Coinbase Wallet',
  logo: '/coinbase-logo.svg', // Ensure you have this logo in your public directory
  connect: () => console.log('Connecting to Coinbase Wallet...'),
};

const WalletConnect = {
  name: 'WalletConnect',
  logo: '/wallet-connect-logo.svg', // Ensure you have this logo in your public directory
  connect: () => console.log('Connecting via WalletConnect...'),
};

const connectors = [Metamask, CoinbaseWallet, WalletConnect];

export function WalletOptions() {
  const isWalletAvailable = (walletType: string): boolean => {
    if (walletType === 'metamask') {
      return typeof (window as any).ethereum !== 'undefined';
    } else if (walletType === 'coinbase') {
      return typeof (window as any).ethereum && (window as any).ethereum?.isCoinbaseWallet !== undefined;
    } else {
      return false; // Default to false for unknown wallet types
    }
  };

  return (
    <Sheet>
      <SheetTrigger>
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
              onClick={connector.connect}
            >
              <div className="flex items-center gap-4">
                <Image src={connector.logo} height={20} width={20} alt={connector.name} className="h-9 w-9" />
                <span className="text-lg font-medium">{connector.name}</span>
              </div>
              {isWalletAvailable(connector.name) && <p className="px-3 py-1 bg-blue-600 rounded-full text-xs font-medium">Installed</p>}
              <TfiAngleRight className="text-xl" />
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
