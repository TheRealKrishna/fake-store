/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains:["fakestoreapi.com","i.dummyjson.com"]
    },
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
      }
}

module.exports = nextConfig
