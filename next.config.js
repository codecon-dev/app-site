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
    },
    async headers() {
        return [
            {
                source: "/api/newsletter/:path*",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "https://test.codecon.dev/" }, // replace this your actual origin
                ]
            }
        ]
    }
};
