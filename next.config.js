/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
		images: {
			unoptimized: true,
		},
  },
	images: {
		domains: ["st.kp.yandex.net", "avatars.mds.yandex.net", "www.themoviedb.org", "kinomore.onrender.com"],
	},
	env: {
		API_TOKEN: process.env.API_TOKEN,
		API_URL: process.env.API_URL,
		INTERNAL_API_URL: process.env.INTERNAL_API_URL
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
  console.log("info  - lanUrl:", `http://${require("address").ip()}:3000`);
}

module.exports = nextConfig;
