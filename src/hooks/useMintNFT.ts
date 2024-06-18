import { useEffect, useState } from 'react';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { contractConfig } from '@/lib/contractConfig';
import { MintData } from '@/lib/types';
import { pinJSONToIPFS } from '@/lib/server-utils';
import { toast } from '@/components/ui/use-toast';

export const useMintNFT = () => {
  const [mintData, setMintData] = useState<MintData | null>(null);
  const { data: hash, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });
  useEffect(() => {
    if (hash) {
      toast({ title: 'Success', description: `Tx hash: ${hash}` });
    }
    if (isConfirming) {
      toast({ title: 'Pending', description: 'Waiting for confirmation...' });
    }
    if (isConfirmed) {
      toast({ title: 'Confirmed', description: 'Transaction confirmed.' });
    }
  }, [hash, isConfirming, isConfirmed]);

  const handleConfirmMint = async (title: string, description: string, cid: string, address: string) => {
    const metadataUrl = await pinJSONToIPFS(title, description, cid);
    console.log(metadataUrl);
    writeContract({
      ...contractConfig,
      functionName: 'mint',
      args: [address, metadataUrl],
    });
  };

  return {
    mintData,
    setMintData,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    handleConfirmMint,
  };
};
