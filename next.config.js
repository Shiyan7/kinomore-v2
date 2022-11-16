/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
		images: {
			unoptimized: true,
		},
  },
	images: {
		domains: ['st.kp.yandex.net', 'avatars.mds.yandex.net', 'www.themoviedb.org'],
	},
	env: {
		API_TOKEN: process.env.API_TOKEN,
		API_URL: process.env.API_URL,
		HOST: process.env.HOST
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: [
				{
					loader: '@svgr/webpack',
					options: {
						icon: true,
					},
				},
			],
		});

		return config;
	},
};

module.exports = nextConfig;
