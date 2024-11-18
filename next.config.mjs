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
            {
                protocol: 'https',
                hostname: 'ajiroba.onrender.comhttps',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'youtu.be',
                port: '',
                /*        pathname: '/A50B4AwxwsU', */
                pathname: '/**',
                /*          search: '?si=bnq1wFc_kMH4Swzm', */
            }


        ],
    }

};

export default nextConfig;
