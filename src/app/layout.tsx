import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';

import Footer from '@/components/footer';
import NavBar from '@/components/navbar';
import { Web3Provider } from '@/context/wagmi-provider';

const open_sans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NFT Sea',
  description: 'buy, mint, and sell NFTs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={open_sans.className}>
        <div className="min-h-screen text-white flex flex-col justify-between mx-auto max-w-[1140px] w-full">
          <Web3Provider>
            <NavBar />
            {children}
            <Footer />
          </Web3Provider>
        </div>
      </body>
    </html>
  );
}
