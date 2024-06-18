import useWalletConnect from '@/hooks/useWalletConnect';
import React from 'react';

function ConnectCTA() {
  const { isConnected, isMounted } = useWalletConnect();

  return <>{isMounted && !isConnected && <p className="mt-4">Connect your wallet now to Begin!!!</p>}</>;
}

export default ConnectCTA;
