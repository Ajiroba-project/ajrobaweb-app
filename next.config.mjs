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
                hostname: 'youtu.be',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'img.daisyui.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'staging.ajiroba.ng',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'ajiroba.ng',
                port: '',
                pathname: '/**',
            }
        ],
    },

    async rewrites() {
        return [
            {
                source: "/api/cable_tv_packages",
                destination: `${process.env.NEXT_PUBLIC_BASE_URL}/pay/nomba/cable_tv_packages`,
            },
        ];
    },
};

export default nextConfig;

