'use client';

import { formatEther } from 'viem';
import { useBalance } from 'wagmi';

import { WalletOptions } from './wallet-options';
import useWalletConnect from '@/hooks/useWalletConnect';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '../ui/button';
import { ArrowDownIcon } from '@radix-ui/react-icons';

function AccountDetails() {
  const { address, isConnected, isMounted, disconnect } = useWalletConnect();

  const formatAddress = (address: string) => `${address.substring(0, 5)}...${address.substring(address.length - 4)}`;
  const { data: balanceData } = useBalance({
    address,
  });

  const balance = balanceData ? parseFloat(formatEther(balanceData.value)).toFixed(4) : '0.0000';

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isMounted && isConnected && address ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {' '}
              <Button className="text-white flex gap-2 font-medium text-sm md:text-base p-2 bg-gray-800 rounded-md shadow-md" variant="cta">
                <span>
                  {formatAddress(address)} | {balance} ETH
                </span>
                <ArrowDownIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent onClick={() => disconnect()} className="cursor-pointer">
              <p>Disconnect</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <WalletOptions />
      )}
    </div>
  );
}

export default AccountDetails;
