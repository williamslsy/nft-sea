'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAccount } from 'wagmi';

import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { ConfirmationModal } from './confirmation-modal';
import ImageUpload from './image-upload';

import { useImageUpload } from '@/hooks/useImageUpload';
import { useMint } from '@/hooks/useMintNFT';

import { toast } from '../ui/use-toast';
import { MintData } from '@/lib/types';

export const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
  description: z.string().min(5, { message: 'Description must be at least 5 characters long' }),
});

export type FormData = z.infer<typeof formSchema>;

function MintForm() {
  const { isConnected } = useAccount();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [mintData, setMintData] = useState<MintData | null>(null);
  const { image, uploading, cid, resetUpload, handleImageUpload, uploadedImageUrl } = useImageUpload();
  const { isConfirmed, setIsModalOpen, isModalOpen, setIsConfirmed } = useMint();

  const onSubmit = (data: FormData) => {
    if (image && data.title && data.description && cid) {
      const mintData = { image, title: data.title, description: data.description };
      setMintData(mintData);
      setIsModalOpen(true);
    } else {
      toast({ title: 'Error', description: 'Please fill out all fields and upload an image', variant: 'destructive', duration: 5000 });
    }
  };

  useEffect(() => {
    if (isConfirmed) {
      reset();
      resetUpload();
      setIsConfirmed(false);
    }
  }, [isConfirmed, reset, resetUpload, setIsConfirmed]);

  return (
    <main className="flex flex-col items-center flex-1 p-5">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[544px] p-5 rounded-lg shadow-lg text-white">
        <ImageUpload onImageUpload={handleImageUpload} uploading={uploading} uploadedImageUrl={uploadedImageUrl} />

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
              <Button type="submit" disabled={!isConnected || uploading || !image || Object.keys(errors).length > 0} variant="cta" className="h-16 w-64">
                Mint and List Immediately
              </Button>
            </DialogTrigger>
            {cid && mintData && <ConfirmationModal mintData={mintData} />}
          </Dialog>
        </div>
      </form>
    </main>
  );
}

export default MintForm;
