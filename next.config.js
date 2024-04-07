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
                // matching all API routes
                source: '/api/newsletter/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: 'https://app.codecon.dev/' }, // replace this your actual origin
                    { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
                    }
                ]
            }
        ];
    }
};
