/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    productionBrowserSourceMaps:false,
    env:{
        BASE_URL:process.env.BASE_URL,
        API_KEY:process.env.API_KEY
    },
    typescript: {
        ignoreBuildErrors: true,
      },
}

module.exports = nextConfig
