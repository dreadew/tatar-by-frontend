import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'accent-green': '#A8D5BA',
				'accent-red': '#E57373',
				'neutral-dark': '#1D1D1D',
				'neutral-light': '#898989',
				'neutral-secondary': '#EBEBEB',
				foreground: '#FAFAFA',
			},
		},
	},
	plugins: [],
}
export default config
