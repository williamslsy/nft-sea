'use client';

import { formatEther } from 'viem';
import { useBalance } from 'wagmi';

import { WalletOptions } from './wallet-options';
import useWalletConnect from '@/hooks/useWalletConnect';

function AccountDetails() {
  const { address, isConnected, isMounted } = useWalletConnect();

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
        <div className="text-white font-medium text-sm md:text-base">
          {formatAddress(address)} | {balance} ETH
        </div>
      ) : (
        <WalletOptions />
      )}
    </div>
  );
}

export default AccountDetails;
