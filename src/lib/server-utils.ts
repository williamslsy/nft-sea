import { GATEWAY_URL } from './constants';

import { toast } from '@/components/ui/use-toast';

export const uploadFile = async (fileToUpload: File): Promise<string> => {
  try {
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

    if (!res.ok) {
      throw new Error(`Failed to upload file: ${res.statusText}`);
    }
    const json = await res.json();

    toast({ title: 'Success', description: 'Image Uploaded Successfully!', variant: 'success', duration: 5000 });
    return json.IpfsHash;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error uploading file:', error);
    toast({ title: 'Error', description: `Error uploading file, Contact Admin: ${message || 'Unknown error'}`, variant: 'destructive', duration: 5000 });
    throw new Error(message);
  }
};

export const pinJSONToIPFS = async (title: string, description: string, imageCID: string): Promise<string> => {
  const metadata = {
    pinataContent: {
      name: title,
      description: description,
      image: `${GATEWAY_URL}/ipfs/${imageCID}`,
      external_url: GATEWAY_URL,
    },
    pinataMetadata: {
      name: `${title}-metadata.json`,
    },
  };

  try {
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

    if (!res.ok) {
      throw new Error(`Failed to pin JSON to IPFS: ${res.statusText}`);
    }

    const resData = await res.json();
    const metadataHash = resData.IpfsHash;
    const metadataUrl = `${GATEWAY_URL}/ipfs/${metadataHash}`;
    console.log('Metadata pinned:', metadataUrl);

    toast({
      title: 'Info',
      description: 'NFT metadata pinned!',
      variant: 'info',
    });

    return metadataUrl;
  } catch (error: unknown) {
    console.error('Error pinning JSON to IPFS:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    toast({
      title: 'Error',
      description: `Error pinning JSON to IPFS: ${message || 'Unknown error'}`,
      variant: 'destructive',
      duration: 5000,
    });
    throw new Error(message);
  }
};
