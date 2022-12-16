/** @type {import('next').NextConfig} */
const address = require("address");

const nextConfig = {
  experimental: {
		images: {
			unoptimized: true,
		},
  },
	images: {
		domains: ["st.kp.yandex.net", "avatars.mds.yandex.net", "www.themoviedb.org"],
	},
	env: {
		API_TOKEN: process.env.API_TOKEN,
		API_URL: process.env.API_URL
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: [
				{
					loader: "@svgr/webpack",
					options: {
						icon: true,
					},
				},
			],
		});

		return config;
	},
};

if (process.env.NODE_ENV === "development") {
  console.log("info  - lanUrl:", `http://${address.ip()}:3000`);
}

module.exports = nextConfig;
