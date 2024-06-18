/** @type {import('next').NextConfig} */


import path from 'path';
const nextConfig = {
    webpack: (config) => {
        config.resolve.modules.push(path.resolve('./'));
        return config;
    },
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
