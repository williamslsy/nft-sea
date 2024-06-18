import HeadLine from '@/components/headline';
import MintForm from '@/components/mint-form';
import { MintProvider } from '@/context/mint-context';

const MintNFTPage = () => {
  return (
    <div className="">
      <HeadLine />
      <MintProvider>
        <MintForm />
      </MintProvider>
    </div>
  );
};

export default MintNFTPage;
