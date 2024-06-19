import useWalletConnect from '@/hooks/useWalletConnect';
import React from 'react';

function ConnectCTA() {
  const { isConnected, isMounted } = useWalletConnect();

  return <>{isMounted && !isConnected && <p className="mt-4 text-sm sm:text-base">Connect your wallet now to get started!</p>}</>;
}

export default ConnectCTA;
