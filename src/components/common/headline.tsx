'use client';
import React from 'react';
import ConnectCTA from './connect-cta';

function HeadLine() {
  return (
    <div className="gradient-bg text-center p-4 sm:p-10 rounded-xl shadow-xl mx-auto max-w-[90%] sm:max-w-[1100px] h-auto sm:h-52 px-4 border border-white mt-2">
      <h2 className="text-xl sm:text-3xl text-white font-bold gradient-text font-cinzel mt-2">Mint New NFT</h2>
      <p className="text-sm sm:text-base text-gray-400 mt-4">
        Transform your creative ideas into digital assets.
        <br />
        Join a vibrant community of digital artists and collectors by minting your unique NFTs.
      </p>
      <ConnectCTA />
    </div>
  );
}

export default HeadLine;
