import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MintData } from '@/lib/types';
import Image from 'next/image';

interface ConfirmationModalProps {
  mintData: MintData;
  cid: string;
}

export function ConfirmationModal({ mintData, cid }: ConfirmationModalProps) {
  return (
    <DialogContent className="bg-black">
      <DialogHeader>
        <DialogTitle>Confirm Minting</DialogTitle>
        <DialogDescription>Review the information before confirming:</DialogDescription>
      </DialogHeader>
      <div className="my-4 text-white">
        <p>{cid}</p>
        {mintData?.image && <Image src={URL.createObjectURL(mintData.image)} alt="Preview" className="w-full h-auto rounded-lg" width={20} height={20} />}
        <p className="text-lg font-bold">{mintData?.title}</p>
        <p className="text-sm">{mintData?.description}</p>
      </div>
      <DialogFooter>
        <Button type="button">Mint</Button>
        {/* <Button onClick={() => setMintData(undefined)}>Cancel</Button> */}
      </DialogFooter>
    </DialogContent>
  );
}
