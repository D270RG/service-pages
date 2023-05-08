/** @type {import('next').NextConfig} */
module.exports = {
	async rewrites() {
		return [
			// Rewrite everything else to use `pages/index`
			{
				source: '/:path*',
				destination: '/',
			},
		];
	},
	experimental: {
		appDir: true,
	},
	optimizeFonts: false,
};
