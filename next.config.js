/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    images: {
        domains:["fakestoreapi.com", "i.dummyjson.com", "localhost", "krishna.lol", "fakestore.krishna.lol"],
        unoptimized:true,
    },
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
      }
}

module.exports = nextConfig
