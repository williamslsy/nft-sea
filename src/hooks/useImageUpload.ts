import { useEffect, useState } from 'react';
import { uploadFile } from '@/lib/server-utils';
import { toast } from '@/components/ui/use-toast';

export const useImageUpload = () => {
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [cid, setCid] = useState<string>('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    setImage(file);
    setUploading(true);

    try {
      const cid = await uploadFile(file);
      setCid(cid);

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setUploadedImageUrl(e.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast({ title: 'Error', description: 'Error uploading file', variant: 'destructive', duration: 5000 });
    } finally {
      setUploading(false);
    }
  };

  const resetUpload = () => {
    setImage(null);
    setCid('');
    setUploadedImageUrl('');
  };

  return {
    image,
    uploading,
    cid,
    uploadedImageUrl,
    handleImageUpload,
    resetUpload,
  };
};
