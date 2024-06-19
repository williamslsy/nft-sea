# NFT Sea

## Overview

**The Task**: As a user, I want to be able to connect my wallet to an application and mint a new NFT.

## Scope of Work:

- **Create Page for Minting NFT**:
  - Include inputs for title, description, and image.
  - Implement functionality to upload an image from local storage and store it in decentralized storage (IPFS).
  - Use the [OpenSea Metadata Standards](https://docs.opensea.io/docs/metadata-standards) to create a standardized JSON object and store it in decentralized storage.
- **Create Service Call to Contracts**:
  - Use Wagmi integration to call the minting function.
- **Implementation of Figma Design**:
  - Ensure the application layout and components are consistent with the provided Figma design.

### Getting Started

#### Clone the Repository

```bash
git clone https://github.com/williamslsy/nft-sea.git
cd nft-sea
```

#### Install Dependencies and Run the Development Server

```bash
yarn && yarn dev
```

**The .env variables required to run the app**

```bash
PINATA_JWT=
NEXT_PUBLIC_GATEWAY_URL=
NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_NFT_ADDRESS=
```

The app should now be up and running.

Here's the [Link to the Build](https://nft-sea-delta.vercel.app/).

## Application Flow:

**To mint a new NFT**

1. Connect your wallet using the wallet options provided.
2. Upload an image, fill in the NFT title, description.
3. Confirm mint details
4. Submit to initiate the minting process.

## Tools and Technologies Used

- **Shadcn-UI**: Consistent UI components and application layout.
- **TypeScript**: Type safety, better code quality, and fewer runtime errors.
- **TailwindCSS**: Atomic design, custom styling, and responsive design.
- **Next.js**: Efficient data fetching and performance through static site generation and server side rendering.
- **React Hooks and Custom Hooks**: State management and code modularity.
- **Wagmi**: Wallet connection and smart contract interactions for Ethereum.
- **Toast Notifications**: Real-time user feedback on actions.
- **Context API**: Managing complex state and improving state management predictability and efficiency.

### Structure

- **Mint Form Component (`mint-form.tsx`)**: Handles user input for NFT details and image upload, managing the form submission and validation.
- **Confirmation Modal (`confirmation-modal.tsx`)**: Displays the details before confirming the minting process, ensuring the user can review and confirm their submission.
- **Mint Context (`context/mint-provider.tsx`)**: Contains all functionalities and callback functions, managing the state and logic of the minting process, including interactions with the blockchain and IPFS.
- **API Route (`app/api/files/route.ts`)**: Handles the generation of JWT for secure communication with the Pinata API, ensuring that only authorized uploads are allowed.
- **Wallet Options(`wallet-options.tsx`)**: Provides wallet connection options.

- **Custom Hook (`useImageUpload.ts`)**: Manages the image upload process, including state management for the upload status and handling the communication with IPFS.
- **Custom Hook (`useMintNFT.ts`)**: Manages the minting process, including state management for the minting status and handling interactions with the smart contract using Wagmi.

- **Utility Functions (`lib/server-utils.ts`)**: Contains server call functions for saving data and checking processing status, including interactions with Pinata for storing images and metadata.

This structure ensures that each part of the application is modular and maintains a clear separation of concerns, promoting maintainability and scalability.

### Ensuring a Performant UI with Emphasis on a Friendly UX

1. **React Hooks and Custom Hooks**:

   - Leveraged React hooks for state management and custom hooks for encapsulating logic.

2. **Memoized Callback Functions**:

   - Used `useCallback` to memoize functions, reducing unnecessary re-renders and enhancing performance.

3. **Error Handling and User Feedback**:

   - Implemented toast notifications for error, progress, and success states, providing immediate feedback to users.

4. **Conditional Link for Viewing Minted NFT**:

   - A link to view the minted NFT is conditionally rendered based on the nftUrl. If the minting process is successful, a "View NFT" button appears, allowing users to view their newly minted NFT.

5. **Mobile Responsiveness**
   - The application is designed to be mobile-friendly, with adjustments to layout and styles to ensure a seamless experience on smaller screens.

#### Challenges Faced

- **Pinata Setup**: Initially struggled with the setup process for Pinata. Found the following resource helpful for configuring the signed JWT for IPFS uploads: [Pinata Guide](https://www.pinata.cloud/blog/how-to-upload-to-ipfs-from-the-frontend-with-signed-jwts/).

##### I'm eager to receive feedback on this. Please leave comments on areas for improvement. Thank you.
