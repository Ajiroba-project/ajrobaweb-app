/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ajiroba.onrender.com',
                port: '',
                pathname: '/**',
            },


        ],
    }

};

export default nextConfig;
