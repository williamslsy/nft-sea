import { cookieStorage, createConfig, createStorage, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected, walletConnect, metaMask, coinbaseWallet } from 'wagmi/connectors';
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error('Project ID is not defined');

export const wagmiConfig = createConfig({
  connectors: [
    metaMask({
      dappMetadata: {
        name: 'NFT Sea',
        url: 'https://nftsea.com',
      },
    }),
    coinbaseWallet(),
    walletConnect({ projectId }),
  ],
  chains: [sepolia, mainnet],
  transports: {
    [sepolia.id]: http('https://sepolia.gateway.tenderly.co'),
    [mainnet.id]: http(),
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
});
