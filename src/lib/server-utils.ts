import axios from 'axios';
import { MintData } from './types';

export async function uploadToIPFS(file: File | Blob): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  console.log(file, 'file'); // Good for debugging

  const pinataMetadata = JSON.stringify({
    name: 'image',
  });
  formData.append('pinataMetadata', pinataMetadata);

  try {
    const pinataResponse = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: formData,
    });

    if (!pinataResponse.ok) {
      throw new Error(`Failed to upload to IPFS: ${pinataResponse.statusText}`);
    }

    const pinataData = await pinataResponse.json();
    if (!pinataData.IpfsHash) {
      throw new Error('No IPFS hash returned from Pinata');
    }

    return `ipfs://${pinataData.IpfsHash}`;
  } catch (error) {
    console.error('Error uploading file to IPFS:', error);
    throw error;
  }
}

export const pinJSONToIPFS = async (mintData: MintData) => {
  const JWT = `Bearer ${process.env.PINATA_JWT}`; // Replace with your actual JWT from Pinata

  const metadata = {
    pinataContent: {
      name: mintData.title,
      description: mintData.description,
      image: mintData.image,
    },
    pinataMetadata: {
      name: `${mintData.title}-metadata.json`,
    },
  };

  try {
    const response = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', metadata, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: JWT,
      },
    });
    console.log('Metadata uploaded:', response.data);
    return `ipfs://${response.data.IpfsHash}`;
  } catch (error) {
    console.error('Failed to upload metadata to IPFS:', error);
    throw new Error('Failed to upload metadata to IPFS');
  }
};
