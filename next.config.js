/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env:{
        BASE_URL:process.env.BASE_URL,
        API_KEY:process.env.API_KEY
    }
}

module.exports = nextConfig
