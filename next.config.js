module.exports = {
    env: {
        VERCEL_ENV: process.env.VERCEL_ENV,
        VERCEL_URL: process.env.VERCEL_URL
    },
    images: {
        domains: [
            'www.datocms-assets.com',
            'a.storyblok.com',
            'images.ctfassets.net',
            'images.prismic.io',
            'cdn.aglty.io'
        ],
        imageSizes: [24, 64, 300]
    }
};
