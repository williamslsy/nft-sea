'use client';
import React from 'react';
import ConnectCTA from './connect-cta';

function HeadLine() {
  return (
    <div className="gradient-bg text-center p-10 rounded-xl shadow-xl mx-auto max-w-[1100px] h-52 px-4 border border-white mt-2">
      <h2 className="text-3xl text-white font-bold gradient-text font-cinzel mt-2">Mint New NFT</h2>
      <p className="text-gray-400 mt-4">
        Turn your imagination into reality. <br />
        Mint unique NFTs and join the thriving community of digital artists and collectors.
      </p>
      <ConnectCTA />
    </div>
  );
}

export default HeadLine;
