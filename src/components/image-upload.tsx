import { GoUpload } from 'react-icons/go';
import { Label } from './ui/label';
import { cn } from '@/lib/utils'; // Make sure to adjust the import path according to your project structure
import Image from 'next/image';
import { useImageUpload } from '@/hooks/useImageUpload';

interface ImageUploadProps {
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploading: boolean;
  uploadedImageUrl: string | null;
}
export default function ImageUpload({ onImageUpload: handleImageUpload, uploading, uploadedImageUrl }: ImageUploadProps) {
  const isImageUploaded = !!uploadedImageUrl;
  return (
    <div className="relative w-full">
      <Label
        className={cn(
          'flex flex-col items-center justify-center py-10 h-40 px-3 gap-2 border-2 border-dashed rounded-lg text-white bg-inputBg w-full cursor-pointer transition duration-200 ease-in-out',
          uploading ? 'border-green-500' : 'border-gray-400 hover:border-blue-500'
        )}
      >
        {uploadedImageUrl ? (
          <div className="flex flex-col items-center gap-2">
            <Image src={uploadedImageUrl} alt="Uploaded" className="h-24 w-24 object-contain rounded-md" width={20} height={20} />
          </div>
        ) : (
          <>
            <div className="flex gap-1">
              <GoUpload className="text-lg" />
              <span className="text-sm text-center font-medium leading-[1.2] self-stretch">Upload Image</span>
            </div>
            <div className="text-xs text-gray-400">JPEG, PNG, GIF, BMP, TIFF formats supported</div>
          </>
        )}
        <input type="file" accept="image/jpeg,image/png,image/gif,image/bmp,image/tiff" onChange={handleImageUpload} className="hidden" disabled={uploading} />
        {uploading ? (
          <div className="mt-2 text-sm text-green-500">Uploading...</div>
        ) : isImageUploaded ? (
          <div className="mt-2 text-sm flex gap-1">
            <GoUpload className="text-lg" />
            <span className="text-sm text-center font-medium leading-[1.2] self-stretch">Update Image</span>
          </div>
        ) : (
          <div className="mt-2 text-sm text-green-500">Ready to upload</div>
        )}
      </Label>
    </div>
  );
}
