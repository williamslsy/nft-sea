import { cookieStorage, createConfig, createStorage, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { walletConnect, coinbaseWallet } from 'wagmi/connectors';

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error('Project ID is not defined');

export const wagmiConfig = createConfig({
  connectors: [coinbaseWallet(), walletConnect({ projectId })],
  chains: [sepolia],
  transports: {
    [sepolia.id]: http('https://sepolia.gateway.tenderly.co'),
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
});
