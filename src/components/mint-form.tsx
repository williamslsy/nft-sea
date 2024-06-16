'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import ImageUpload from './image-upload';
import { ConfirmationModal } from './mint-dialog';
import { type MintData } from '@/lib/types';
import { Dialog, DialogTrigger } from './ui/dialog';

function MintForm() {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [mintData, setMintData] = useState<MintData | null>(null);
  const [uploading, setUploading] = useState(false);
  const [cid, setCid] = useState('');

  // const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files ? event.target.files[0] : null;
  //   setImage(file);
  // };

  // const uploadFile = async (fileToUpload: File) => {
  //   setUploading(true);
  //   try {
  //     const jwtRes = await fetch('/api/files', { method: 'POST' });
  //     const JWT = await jwtRes.text();
  //     const formData = new FormData();
  //     formData.append('file', fileToUpload);

  //     const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${JWT}`,
  //       },
  //       body: formData,
  //     });

  //     if (!res.ok) throw new Error('Failed to upload to Pinata');

  //     const json = await res.json();
  //     setCid(json.IpfsHash);
  //     setUploading(false);
  //   } catch (e) {
  //     console.error('Error uploading file:', e);
  //     alert('Trouble uploading file');
  //     setUploading(false);
  //   }
  // };
  const handleImageUpload = async (event) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    setImage(file); // Set the file in state if you need to show a preview or use it later
    setUploading(true);

    try {
      await uploadFile(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploading(false);
      alert(error.message || 'Error uploading file');
    }
  };

  const uploadFile = async (fileToUpload) => {
    try {
      setUploading(true);
      const jwtRes = await fetch('https://localhost:3000/api/files', { method: 'POST' });
      const JWT = await jwtRes.text();
      const formData = new FormData();
      formData.append('file', fileToUpload, { filename: fileToUpload.name });

      const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
        body: formData,
      });

      const json = await res.json();
      const { IpfsHash } = json;

      setCid(IpfsHash);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert('Trouble uploading file');
    }
  };

  const handleMintClick = async () => {
    if (image && title && description) {
      const data = { image, title, description };
      setMintData(data);
    } else {
      alert('Please fill all fields and upload an image');
    }
  };

  return (
    <main className="flex flex-col items-center flex-1 p-5">
      <div className="w-full max-w-md p-5 rounded-lg shadow-lg text-white">
        <ImageUpload onImageUpload={handleImageUpload} uploading={uploading} />
        <Input type="text" placeholder="NFT Title" value={title} onChange={(e) => setTitle(e.target.value)} className="my-4 block w-full bg-inputBg" />
        <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="mb-4 block w-full h-32 bg-inputBg" />
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={handleMintClick} disabled={uploading || !image || !title || !description}>
              Mint and List Immediately
            </Button>
          </DialogTrigger>
          {cid && mintData && <ConfirmationModal mintData={mintData} onConfirmMint={handleMintClick} />}
        </Dialog>
        {cid && <p>CID: {cid}</p>}
      </div>
    </main>
  );
}

export default MintForm;
