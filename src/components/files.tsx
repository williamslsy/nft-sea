import Image from 'next/image';
import React from 'react';

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL ? process.env.NEXT_PUBLIC_GATEWAY_URL : 'https://gateway.pinata.cloud';

interface FilesProps {
  cid: string;
}
export default function Files({ cid }: FilesProps) {
  return (
    <div className="file-viewer">
      <p>Your IPFS CID:</p>
      <p>{cid}</p>
      <a
        href={`${GATEWAY_URL}/ipfs/${cid}?pinataGatewayToken=${process.env.NEXT_PUBLIC_GATEWAY_TOKEN}`}
        rel="noopener noreferrer"
        target="_blank"
        className="border-b-2 border-solid border-accent bg-gradient-to-r from-purple-600 to-pink-400 bg-clip-text text-transparent animate-animategradient hover:scale-110 transition-all duration-300 ease-in-out"
      >
        View file
      </a>
    </div>
  );
}
