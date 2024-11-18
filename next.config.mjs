import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com', pathname: '**' },
      { protocol: 'https', hostname: '6dph3blg-3000.euw.devtunnels.ms', pathname: '**' },
      { protocol: 'https', hostname: 'cdn.discordapp.com', pathname: '**' },
      { protocol: 'https', hostname: 'placehold.co', pathname: '**' },
      { protocol: 'https', hostname: 'reqres.in', pathname: '**' },
      { protocol: 'https', hostname: 'ui-avatars.com', pathname: '**'}
    ],
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 86400,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  webpack: (config) => config,
  experimental: {
    serverActions: {
      allowedOrigins: [`${process.env.PUBLIC_HOSTNAMES}`]
    }
  },
};

// Экспорт без использования million
export default withNextIntl(nextConfig);