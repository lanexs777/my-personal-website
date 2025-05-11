/** @type {import('next').NextConfig} */
const nextConfig = {
    output: process.env.NODE_ENV === "development" ? undefined : "export",
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: { unoptimized: true },
};

module.exports = nextConfig;
