'use client';
import React, { useEffect, useState } from 'react';
import { formatEther } from 'viem';
import { useAccount, useBalance } from 'wagmi';
import { WalletOptions } from './wallet-options';

function AccountDetails() {
  const { address, isConnected } = useAccount();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      {isConnected && address ? (
        <>
          <div className="text-white font-medium">
            {formatAddress(address)} | {balance} ETH
          </div>
        </>
      ) : (
        <WalletOptions />
      )}
    </div>
  );
}

export default AccountDetails;
