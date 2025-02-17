// /** @type {import('next').NextConfig} */


// import path from 'path';
// const nextConfig = {
//     webpack: (config) => {
//         config.resolve.modules.push(path.resolve('./'));
//         return config;
//     },
//     images: {
//         remotePatterns: [
//             {
//                 protocol: 'https',
//                 hostname: 'ajiroba.onrender.com',
//                 port: '',
//                 pathname: '/**',
//             },
//             {
//                 protocol: 'https',
//                 hostname: 'ajiroba.onrender.comhttps',
//                 port: '',
//                 pathname: '/**',
//             },
//             {
//                 protocol: 'https',
//                 hostname: 'youtu.be',
//                 port: '',
//                 /*        pathname: '/A50B4AwxwsU', */
//                 pathname: '/**',
//                 /*          search: '?si=bnq1wFc_kMH4Swzm', */
//             }, {
//                 protocol: 'https',
//                 hostname: 'via.placeholder.com',
//                 port: '',
//                 pathname: '/**',
//             }
//             ,
//             {
//                 protocol: 'https',
//                 hostname: 'img.daisyui.com',
//                 port: '',
//                 pathname: '/**',
//             },
//             {
//                 protocol: 'https',
//                 hostname: 'ajiroba.onrender.comnull',
//                 port: '',
//                 pathname: '/**'
//             }

//             ,
//             {
//                 protocol: 'https',
//                 hostname: "ajiroba.onrender.com",
//                 port: '',
//                 pathname: '/**'
//             }


//         ],
//     },

//     async rewrites() {
//         return [
//             {
//                 source: "/api/cable_tv_packages", // Proxy route
//                 destination: "https://ajiroba.onrender.com/v1/pay/nomba/cable_tv_packages", // Target API
//             },
//         ];
//     },

// };

// export default nextConfig;


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
            }
        ],
    },

    async rewrites() {
        return [
            {
                source: "/api/cable_tv_packages",
                destination: "https://ajiroba.onrender.com/v1/pay/nomba/cable_tv_packages",
            },
        ];
    },
};

export default nextConfig;

