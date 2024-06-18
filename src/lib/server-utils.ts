import { GATEWAY_URL } from './constants';

export const uploadFile = async (fileToUpload: File): Promise<string> => {
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
  return json.IpfsHash;
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
  const metaUrl = `${GATEWAY_URL}/ipfs/${metadataHash}`;
  console.log('Metadata pinned:', metaUrl);
  return metaUrl;
};
