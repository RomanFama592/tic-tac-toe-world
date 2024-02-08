/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			textShadow: {
				sm: '0 1px 2px var(--tw-shadow-color)',
				DEFAULT: '0 2px 4px var(--tw-shadow-color)',
				lg: '0 8px 16px var(--tw-shadow-color)',
				insite: '0 0 10px var(--tw-shadow-color)'
			},

		},
	},
	daisyui: {
		themes: ["light", "dark"]
	},
	plugins: [plugin(function ({ matchUtilities, theme }) {
		matchUtilities(
			{
				'text-shadow': (value) => ({
					textShadow: value,
				}),
			},
			{ values: theme('textShadow') }
		)
	}), require("daisyui")],
}