/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        contentSecurityPolicy: ``,
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5001',
                pathname: "/uploads/**"
            },
        ],
    },
    experimental: {
        allowMiddlewareResponseBody: true,
    },
}

module.exports = nextConfig