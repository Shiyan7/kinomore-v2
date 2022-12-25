// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		domains: ["st.kp.yandex.net", "avatars.mds.yandex.net", "www.themoviedb.org"],
		unoptimized: true,
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

		config.resolve.alias = {
      ...config.resolve?.alias,
      /**
       * Prevent using effector .mjs extension in "web" version of bundle
       * Otherwise, we can face different bugs when using effector
       */
      effector: path.resolve("./node_modules/effector/effector.cjs.js"),
      "effector-react/scope": path.resolve("./node_modules/effector-react/scope.js"),
      "effector-react": path.resolve("./node_modules/effector-react/effector-react.cjs.js"),
    };

		return config;
	},
};

if (process.env.NODE_ENV === "development") {
  console.log("info  - lanUrl:", `http://${require("address").ip()}:3000`);
}

module.exports = nextConfig;
