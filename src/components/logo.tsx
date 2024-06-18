import Image from 'next/image';

function Logo() {
  return (
    <div>
      <Image src="/NFTSea.png" width={100} height={40} alt="NFT Sea" />
    </div>
  );
}

export default Logo;
