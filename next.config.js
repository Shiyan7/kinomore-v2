const svg = require('@neodx/svg/webpack');

const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['st.kp.yandex.net', 'avatars.mds.yandex.net', 'themoviedb.org', 'kinomore.blob.core.windows.net'],
  },
  env: {
    API_TOKEN: process.env.API_TOKEN,
    API_URL: process.env.API_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    INTERNAL_API_URL: process.env.INTERNAL_API_URL,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        svg({
          group: true,
          root: 'src/shared/ui/icon/assets',
          output: 'public/sprite',
          resetColors: false,
          metadata: 'src/shared/ui/icon/sprite.h.ts',
        }),
      );
    }
    return config;
  },
};

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console
  console.log('info  - lanUrl:', `http://${require('address').ip()}:3000`);
}

module.exports = nextConfig;
