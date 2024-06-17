'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import ImageUpload from './image-upload';
import { ConfirmationModal } from './confirmation-modal';
import { Dialog, DialogTrigger } from './ui/dialog';
import Files from './files';
import { MintData } from '@/lib/types';

function MintForm() {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [mintData, setMintData] = useState<MintData | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [cid, setCid] = useState<string>('');

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    setImage(file);
    setUploading(true);

    try {
      await uploadFile(file);
    } catch (error: any) {
      console.error('Error uploading file:', error);
      setUploading(false);
      alert(error.message || 'Error uploading file');
    }
  };

  const uploadFile = async (fileToUpload: File) => {
    setUploading(true);
    const jwtRes = await fetch('/api/files', { method: 'POST' });
    const JWT = await jwtRes.text();
    const formData = new FormData();
    formData.append('file', fileToUpload);

    const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
      body: formData,
    });

    const json = await res.json();
    setCid(json.IpfsHash);
    setUploading(false);
  };

  const pinJSONToIPFS = async (title: string, description: string, imageCID: string): Promise<string> => {
    const metadata = {
      pinataContent: {
        name: title,
        description: description,
        image: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${imageCID}`,
        external_url: process.env.NEXT_PUBLIC_GATEWAY_URL,
      },
      pinataMetadata: {
        name: `${title}-metadata.json`,
      },
    };

    const jwtRes = await fetch('/api/files', { method: 'POST' });
    const JWT = await jwtRes.text();

    const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT}`,
      },
      body: JSON.stringify(metadata),
    });

    const resData = await res.json();
    const metadataHash = resData.IpfsHash;
    const metaUrl = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${metadataHash}`;
    console.log('Metadata pinned:', metaUrl);
    return metaUrl;
  };

  const handleMint = async () => {
    if (image && title && description && cid) {
      const data = { image, title, description };
      setMintData(data);
      const metaUrl = await pinJSONToIPFS(title, description, cid);
      console.log(metaUrl);
    } else {
      alert('Please fill all fields and upload an image');
    }
  };

  return (
    <main className="flex flex-col items-center flex-1 p-5">
      <div className="w-full max-w-md p-5 rounded-lg shadow-lg text-white">
        <ImageUpload onImageUpload={handleImageUpload} uploading={uploading} />
        {cid && <Files cid={cid} />}
        <Input type="text" placeholder="NFT Title" value={title} onChange={(e) => setTitle(e.target.value)} className="my-4 block w-full bg-inputBg" />
        <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="mb-4 block w-full h-32 bg-inputBg" />
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={handleMint} disabled={uploading || !image || !title || !description}>
              Mint and List Immediately
            </Button>
          </DialogTrigger>
          {cid && mintData && <ConfirmationModal mintData={mintData} />}
        </Dialog>
      </div>
    </main>
  );
}

export default MintForm;
