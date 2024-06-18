import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useMintNFT } from '@/hooks/useMintNFT';
import useWalletConnect from '@/hooks/useWalletConnect';
import { MintData } from '@/lib/types';
import Image from 'next/image';

interface ConfirmationModalProps {
  mintData: MintData;
}

export function ConfirmationModal({ mintData }: ConfirmationModalProps) {
  const { isMinting, handleConfirmMint, isPending } = useMintNFT();
  const { address } = useWalletConnect();
  const { cid } = useImageUpload();

  const handleMint = () => {
    if (mintData) {
      handleConfirmMint(mintData.title, mintData.description, cid, address as string);
    }
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