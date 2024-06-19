import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useImageUpload } from '@/hooks/useImageUpload';
import useWalletConnect from '@/hooks/useWalletConnect';
import { MintData } from '@/lib/types';
import Image from 'next/image';
import { useMint } from '@/hooks/useMintNFT';

interface ConfirmationModalProps {
  mintData: MintData;
}

export function ConfirmationModal({ mintData }: ConfirmationModalProps) {
  const { handleConfirmMint, isPending, isMinting, isConfirmed } = useMint();
  const { address } = useWalletConnect();
  const { cid } = useImageUpload();

  const handleMint = () => {
    if (mintData) {
      handleConfirmMint(mintData.title, mintData.description, cid, address as string);
    }
  };

  return (
    <DialogContent className="bg-black border-gray-400">
      <DialogHeader>
        <DialogTitle className="text-white">Confirm Your Mint</DialogTitle>
        <DialogDescription>Review the information before confirming</DialogDescription>
      </DialogHeader>
      <div className="my-4 text-white">
        {mintData?.image && <Image src={URL.createObjectURL(mintData.image)} alt="Preview" className="w-full h-auto rounded-lg" width={20} height={20} />}
        <p className="text-lg font-bold font-cinzel mt-2">{mintData?.title}</p>
        <p className="text-sm text-gray-400">{mintData?.description}</p>
      </div>
      <DialogFooter>
        <Button type="button" onClick={handleMint} disabled={isMinting || isPending} variant="cta" className="mx-auto h-16 w-40">
          {isPending || isMinting ? 'Confirming...' : 'Continue'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
