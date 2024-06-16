import { HiUpload } from 'react-icons/hi';
import { Label } from './ui/label';

interface ImageUploadProps {
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploading: boolean;
}

export default function ImageUpload({ onImageUpload, uploading }: ImageUploadProps) {
  return (
    <div className="relative w-full">
      <Label
        className={`flex flex-col items-center justify-center py-10 px-3 gap-2 border-2 border-dashed ${
          uploading ? 'border-red-500' : 'border-gray-400 hover:border-blue-500'
        } rounded-lg text-white bg-inputBg w-full cursor-pointer transition duration-200 ease-in-out`}
      >
        <HiUpload className="text-lg" />
        <span className="text-sm text-center opacity-50 font-bold leading-[1.2] self-stretch">Upload Image</span>
        <div className="text-xs text-gray-400">Format Supported</div>
        <input type="file" accept="image/*" onChange={onImageUpload} className="hidden" disabled={uploading} />
        {uploading ? <div className="mt-2 text-sm text-red-500">Uploading...</div> : <div className="mt-2 text-sm text-green-500">Ready to upload</div>}
      </Label>
    </div>
  );
}
