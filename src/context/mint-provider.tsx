'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { contractConfig } from '@/lib/contractConfig';
import { pinJSONToIPFS } from '@/lib/server-utils';
import { toast } from '@/components/ui/use-toast';
import useWalletConnect from '@/hooks/useWalletConnect';
import { MintData } from '@/lib/types';

interface MintContextType {
  mintData: MintData | null;
  setMintData: React.Dispatch<React.SetStateAction<MintData | null>>;
  handleConfirmMint: (title: string, description: string, cid: string, address: string) => Promise<void>;
  isPending: boolean;
  isMinting: boolean;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isConfirmed: boolean;
  setIsConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MintContext = createContext<MintContextType | null>(null);

export const MintProvider = ({ children }: { children: ReactNode }) => {
  const [mintData, setMintData] = useState<MintData | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { data: hash, isPending, isError, error, writeContract } = useWriteContract();
  const { connectWallet, isConnected } = useWalletConnect();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleConfirmMint = useCallback(
    async (title: string, description: string, cid: string, address: string) => {
      if (!isConnected) {
        await connectWallet();
        return;
      }
      try {
        setIsMinting(true);
        const metadataUrl = await pinJSONToIPFS(title, description, cid);
        writeContract({
          ...contractConfig,
          functionName: 'mint',
          args: [address, metadataUrl],
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        toast({
          title: 'Error',
          description: `Failed to mint NFT: ${message}`,
          variant: 'destructive',
        });
        setIsMinting(false);
      }
    },
    [isConnected, connectWallet, writeContract]
  );

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Error',
        description: `Failed to mint NFT: ${error?.message || 'Unknown error'}`,
        variant: 'destructive',
      });
      setIsMinting(false);
      setIsModalOpen(false);
    }
    if (hash) {
      toast({ title: 'Success', description: `Tx hash: ${hash}`, variant: 'success' });
    }
    if (isConfirming) {
      toast({ title: 'Pending', description: 'Your transaction is processing. Please wait for confirmation...', variant: 'info' });
    }
    if (isSuccess) {
      toast({ title: 'Confirmed', description: 'Transaction confirmed: Your NFT has been minted', variant: 'success' });
      setIsMinting(false);
      setIsModalOpen(false);
      setIsConfirmed(true);
    }
  }, [hash, isConfirming, isSuccess, isError, error?.message]);

  return <MintContext.Provider value={{ mintData, setMintData, handleConfirmMint, isPending, isMinting, isModalOpen, setIsModalOpen, isConfirmed, setIsConfirmed }}>{children}</MintContext.Provider>;
};
