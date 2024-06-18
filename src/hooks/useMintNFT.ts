import { MintContext } from '@/context/mint-provider';
import { useContext } from 'react';

export const useMint = () => {
  const context = useContext(MintContext);
  if (!context) {
    throw new Error('useMint must be used within a MintProvider');
  }
  return context;
};
