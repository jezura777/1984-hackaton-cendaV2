import type { Config } from 'tailwindcss';

export default {
	content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
	presets: [require('nativewind/preset')],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				mplus: ["'proxima-soft'", 'Verdana', 'sans-serif'],
			},
		},
	},
} satisfies Config;
