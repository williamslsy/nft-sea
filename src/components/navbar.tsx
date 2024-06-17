'use client';
import Image from 'next/image';
import React from 'react';
import { WalletOptions } from './wallet-options';
import { useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';
function NavBar() {
  const { address, isConnected } = useAccount();
  const formatAddress = (address: string) => `${address.substring(0, 5)}...${address.substring(address.length - 4)}`;
  const { data: balanceData } = useBalance({
    address,
  });

  const balance = balanceData ? parseFloat(formatEther(balanceData.value)).toFixed(4) : '0.0000';
  return (
    <div className="flex items-center justify-between p-5 text-white text-lg font-bold">
      <div className="flex items-center">
        <Image src="/NFTSea.png" width={100} height={30} alt="NFT Sea" />
      </div>
      <div className="flex items-center gap-4">
        <span className="ml-3 text-white font-medium text-lg text-opacity-90 hover:text-opacity-100">Explore Marketplace</span>

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
    </div>
  );
}

export default NavBar;
