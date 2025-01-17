/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.NODE_ENV === 'development' ? '' : '/portfolio-thomas-henningson',
    output: 'export', // enables static exports
    reactStrictMode: true,
    images: {
        unoptimized: true, // disables Next.js image optimization
    },
};

export default nextConfig;