import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MintData } from '@/lib/types';
import Image from 'next/image';
import { useState } from 'react';

interface ConfirmationModalProps {
  mintData: MintData;
  isPending: boolean;
  onConfirmMint: () => void;
}

export function ConfirmationModal({ mintData, isPending, onConfirmMint }: ConfirmationModalProps) {
  const [isMinting, setIsMinting] = useState(false);

  const handleMint = () => {
    setIsMinting(true);
    onConfirmMint();
  };
  return (
    <DialogContent className="bg-black">
      <DialogHeader>
        <DialogTitle>Confirm Minting</DialogTitle>
        <DialogDescription>Review the information before confirming:</DialogDescription>
      </DialogHeader>
      <div className="my-4 text-white">
        {mintData?.image && <Image src={URL.createObjectURL(mintData.image)} alt="Preview" className="w-full h-auto rounded-lg" width={20} height={20} />}
        <p className="text-lg font-bold">{mintData?.title}</p>
        <p className="text-sm">{mintData?.description}</p>
      </div>
      <DialogFooter>
        <Button type="button" onClick={handleMint} disabled={isMinting || isPending}>
          {isPending || isMinting ? 'Confirming...' : 'Mint'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
