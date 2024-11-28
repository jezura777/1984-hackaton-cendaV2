import type { Config } from 'tailwindcss';
import { Colors } from './constants/Colors';
import { platformSelect } from 'nativewind/theme';

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
				sans: ['Poppins_400Regular', 'sans-serif'],
				medium: ['Poppins_500Medium', 'sans-serif'],
				semibold: ['Poppins_600SemiBold', 'sans-serif'],
				bold: ['Poppins_700Bold', 'sans-serif'],
			},
		},
	},
} satisfies Config;
