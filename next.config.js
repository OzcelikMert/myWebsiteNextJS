/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
        API_PROTOCOL: process.env.API_PROTOCOL,
        API_HOST: process.env.API_HOST,
        API_PORT: process.env.API_PORT
    },
    reactStrictMode: true,
    swcMinify: true,
    images: {
        contentSecurityPolicy: ``,
        remotePatterns: [
            {
                protocol: process.env.API_PROTOCOL,
                hostname: process.env.API_HOST,
                port: process.env.API_PORT,
                pathname: "/uploads/**"
            },
        ],
    },
    experimental: {
        allowMiddlewareResponseBody: true,
    },
}
console.log(nextConfig)
module.exports = nextConfig