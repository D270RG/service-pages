/** @type {import('next').NextConfig} */
const path = require('path');

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
	pageExtensions: ['tsx'],
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
	webpack(config) {
		// Disable abomination called css modules
		config.module.rules.forEach((rule) => {
			const { oneOf } = rule;
			if (oneOf) {
				oneOf.forEach((one) => {
					if (!`${one.issuer?.and}`.includes('_app')) return;
					one.issuer.and = [path.resolve(__dirname)];
				});
			}
		});

		// Grab the existing rule that handles SVG imports
		const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

		config.module.rules.push(
			// Reapply the existing rule, but only for svg imports ending in ?url
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/, // *.svg?url
			},
			// Convert all other *.svg imports to React components
			{
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/,
				resourceQuery: { not: /url/ }, // exclude if *.svg?url
				use: ['@svgr/webpack'],
			}
		);

		// Modify the file loader rule to ignore *.svg, since we have it handled now.
		fileLoaderRule.exclude = /\.svg$/i;

		return config;
	},
	optimizeFonts: false,
};
