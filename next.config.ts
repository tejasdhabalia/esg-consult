/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en-gb', 'en-in'],
    defaultLocale: 'en-gb',
  },
  eslint: {
    // keep strict; if you need to ship fast with lint errors, set ignoreDuringBuilds: true
    // ignoreDuringBuilds: true,
  },
};
module.exports = nextConfig;
