import { useEffect, useState } from 'react';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { contractConfig } from '@/lib/contractConfig';
import { MintData } from '@/lib/types';
import { pinJSONToIPFS } from '@/lib/server-utils';
import { toast } from '@/components/ui/use-toast';
import useWalletConnect from './useWalletConnect';

export const useMintNFT = () => {
  const [isMinting, setIsMinting] = useState(false);

  const { data: hash, isPending, isError, error, writeContract } = useWriteContract();
  const { connectWallet, isConnected } = useWalletConnect();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handleConfirmMint = async (title: string, description: string, cid: string, address: string) => {
    if (!isConnected) {
      await connectWallet();
      return;
    }
    try {
      setIsMinting(true);
      const metadataUrl = await pinJSONToIPFS(title, description, cid);
      console.log('Metadata URL:', metadataUrl);
      writeContract({
        ...contractConfig,
        functionName: 'mint',
        args: [address, metadataUrl],
      });
    } catch (error: unknown) {
      console.error('Failed to pin or mint:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      toast({
        title: 'Error',
        description: `Failed to mint NFT: ${message || 'Unknown error'}`,
        variant: 'destructive',
      });
      setIsMinting(false);
      throw new Error(message);
    }
  };

  useEffect(() => {
    if (isError) {
      toast({ title: 'Error', description: `Failed to mint NFT: ${error?.message || 'Unknown error'}`, variant: 'destructive' });
      setIsMinting(false);
    }
    if (hash) {
      toast({ title: 'Success', description: `Tx hash: ${hash}`, variant: 'success' });
    }
    if (isConfirming) {
      toast({ title: 'Pending', description: 'Your transaction is processing. Please wait for confirmation...', variant: 'info' });
    }
    if (isConfirmed) {
      toast({ title: 'Confirmed', description: 'Transaction confirmed: Your NFT has been minted', variant: 'success' });
    }
  }, [hash, isConfirming, isConfirmed, isError, error?.message]);

  return {
    hash,
    isMinting,
    isPending,
    isConfirming,
    isConfirmed,
    handleConfirmMint,
  };
};
