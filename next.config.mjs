/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aquamarine-accused-mongoose-32.mypinata.cloud',
      },
    ],
  },
};

export default nextConfig;
