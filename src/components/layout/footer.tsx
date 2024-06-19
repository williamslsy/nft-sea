import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="p-5 text-center text-white text-sm">
      <div className="flex items-center justify-between w-full max-w-screen-lg mx-auto">
        <Image src="/NFTSea.png" width={100} height={40} alt="NFT Sea" />
        <div className="text-white text-opacity-65 font-medium ml-24">NFT Sea {currentYear} © All rights reserved</div>
        <Button className="text-white font-medium text-base text-opacity-90 hover:text-opacity-100 cursor-pointer h-12 w-52" variant="cta">
          Explore Marketplace
        </Button>
      </div>
    </footer>
  );
}

export default Footer;