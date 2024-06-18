import { useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
export default function useWalletConnect() {
  const { connect, connectors } = useConnect();
  const { isConnected, address } = useAccount();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const connectWallet = async () => {
    if (!isConnected) {
      connect({ connector: connectors[0] });
    }
  };

  return { connectWallet, isConnected, isMounted, address };
}
