import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { useImageUpload } from '@/hooks/useImageUpload';
import useWalletConnect from '@/hooks/useWalletConnect';
import { useMint } from '@/hooks/useMintNFT';

import { MintData } from '@/lib/types';

interface ConfirmationModalProps {
  mintData: MintData;
  cid: string;
}

export function ConfirmationModal({ mintData, cid }: ConfirmationModalProps) {
  const { handleConfirmMint, isPending, isMinting, isConfirmed } = useMint();
  const { address } = useWalletConnect();

  const handleMint = () => {
    if (mintData && address && cid) {
      handleConfirmMint(mintData.title, mintData.description, cid, address as string);
    }
  };

  return (
    <DialogContent className="bg-black border-gray-400 rounded-lg">
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
        <div className="w-full flex justify-center">
          <Button type="button" onClick={handleMint} disabled={isMinting || isPending} variant="cta" className="h-16 w-40">
            {isPending || isMinting ? 'Confirming...' : 'Continue'}
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
}
