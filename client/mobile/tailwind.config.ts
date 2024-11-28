import type { Config } from 'tailwindcss';
import { Colors } from './constants/Colors';

export default {
	content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
	presets: [require('nativewind/preset')],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				light: Colors.light,
				dark: Colors.dark,
			},
			fontFamily: {
				mplus: ["'Poppins'", 'Verdana', 'sans-serif'],
			},
		},
	},
} satisfies Config;
