import HeadLine from '@/components/common/headline';
import MintForm from '@/components/minting/mint-form';
import { MintProvider } from '@/context/mint-provider';

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
