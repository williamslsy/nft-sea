'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAccount } from 'wagmi';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import ImageUpload from './image-upload';
import { ConfirmationModal } from './confirmation-modal';
import { Dialog, DialogTrigger } from './ui/dialog';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useMintNFT } from '@/hooks/useMintNFT';

export const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
  description: z.string().min(5, { message: 'Description must be at least 5 characters long' }),
});

export type FormData = z.infer<typeof formSchema>;

function MintForm() {
  const { address } = useAccount();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { image, uploading, cid, uploadedImageUrl, handleImageUpload } = useImageUpload();
  const { mintData, setMintData, isPending, handleConfirmMint, isConfirmed } = useMintNFT();

  const onSubmit = (data: FormData) => {
    if (image && data.title && data.description && cid) {
      const mintData = { image, title: data.title, description: data.description };
      setMintData(mintData);
      setIsModalOpen(true);
    } else {
      alert('Please fill all fields and upload an image');
    }
  };

  useEffect(() => {
    if (isConfirmed) {
      setIsModalOpen(false);
    }
  }, [isConfirmed]);

  return (
    <main className="flex flex-col items-center flex-1 p-5">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[544px] p-5 rounded-lg shadow-lg text-white">
        <ImageUpload onImageUpload={handleImageUpload} uploading={uploading} isImageUploaded={!!cid} uploadedImageUrl={uploadedImageUrl} />

        <div className="my-4">
          <Input type="text" placeholder="NFT Title" className="block bg-inputBg" {...register('title')} />
          {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
        </div>

        <div className="mb-4">
          <Textarea placeholder="Description" {...register('description')} className="block w-full h-32 bg-inputBg" />
          {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
        </div>

        <div className="flex gap-4">
          <Button type="button" disabled className="h-16 w-64">
            Mint without listing
          </Button>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button type="submit" disabled={uploading || !image || Object.keys(errors).length > 0} variant="cta" className="h-16 w-64">
                Mint and List Immediately
              </Button>
            </DialogTrigger>
            {cid && mintData && <ConfirmationModal mintData={mintData} isPending={isPending} onConfirmMint={() => handleConfirmMint(mintData.title, mintData.description, cid, address as string)} />}
          </Dialog>
        </div>
      </form>
    </main>
  );
}

export default MintForm;
