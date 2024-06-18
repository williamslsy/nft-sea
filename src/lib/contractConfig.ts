import { NFTAbi } from '@/abis/NFTAbi';

const contractConfig = {
  address: process.env.NEXT_PUBLIC_NFT_ADDRESS as `0x${string}`,
  abi: NFTAbi,
};

export { contractConfig };
