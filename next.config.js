const nextConfig = {
	images: {
		unoptimized: true,
		domains: ['st.kp.yandex.net', 'avatars.mds.yandex.net', 'themoviedb.org', 'kinomore.onrender.com', 'kinomore.s3.us-east-005.backblazeb2'],
	},
	env: {
		API_TOKEN: process.env.API_TOKEN,
		API_URL: process.env.API_URL,
		CLIENT_URL: process.env.CLIENT_URL,
		INTERNAL_API_URL: process.env.INTERNAL_API_URL
	},
};

if (process.env.NODE_ENV === 'development') {
  console.log('info  - lanUrl:', `http://${require('address').ip()}:3000`);
}

module.exports = nextConfig;
