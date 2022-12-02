/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        contentSecurityPolicy: ``,
    },
    experimental: {
        allowMiddlewareResponseBody: true,
    }
}

module.exports = nextConfig