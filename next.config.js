/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    images: {
        domains: ['*'],
        unoptimized: true,
    },
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
    }
}

module.exports = nextConfig
