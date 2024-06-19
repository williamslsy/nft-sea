import useWalletConnect from '@/hooks/useWalletConnect';
import React from 'react';

function ConnectCTA() {
  const { isConnected, isMounted } = useWalletConnect();

  return <>{isMounted && !isConnected && <p className="mt-4">Get started by connecting your wallet now!</p>}</>;
}

export default ConnectCTA;
