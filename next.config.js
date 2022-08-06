/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
      ignoreBuildErrors: true,
    },

    reactStrictMode: true,
    images: {
        domains: [
            'images.unsplash.com',
            'lh3.googleusercontent.com',
            'cdn.pixabay.com',
        ],
    },
};

module.exports = nextConfig;