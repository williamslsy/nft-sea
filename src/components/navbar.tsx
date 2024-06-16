import Image from 'next/image';
import React from 'react';
import { RiWallet3Line } from 'react-icons/ri';
import { WalletOptions } from './wallet-options';

function NavBar() {
  return (
    <header className="flex items-center justify-between p-5 text-white text-lg font-bold">
      <div className="flex items-center">
        <Image src="/NFTSea.png" width={100} height={30} alt="NFT Sea" />
      </div>
      <div className="flex items-center">
        <span className="ml-3 text-white font-medium text-lg text-opacity-90 hover:text-opacity-100">Explore Marketplace</span>

        <WalletOptions />
      </div>
    </header>
  );
}

export default NavBar;
