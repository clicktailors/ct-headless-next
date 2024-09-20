/** @type {import('tailwindcss').Config} */
const { colors } = require("./lib/colors");

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			spacing: {
				28: "7rem",
			},
			letterSpacing: {
				tighter: "-.04em",
			},
			lineHeight: {
				tight: 1.2,
			},
			fontSize: {
				"5xl": "2.5rem",
				"6xl": "2.75rem",
				"7xl": "4.5rem",
				"8xl": "6.25rem",
			},
			boxShadow: {
				small: "0 5px 10px rgba(0, 0, 0, 0.12)",
				medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
			},
			animation: {
				'gradient-xy': 'gradient-xy 15s ease infinite',
			},
			keyframes: {
				'gradient-xy': {
					'0%, 100%': {
						'background-size': '400% 400%',
						'background-position': 'left center'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center'
					}
				}
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
			borderRadius: {
				large: '1rem',
				medium: '0.5rem',
				small: '0.25rem',
			},
		},
	},
	daisyui: {
		themes: ["light", "dark", "cupcake"],
	},
	daisyui: {
		themes: [
			{
				light: {
					...require("daisyui/src/theming/themes")["light"],
					"primary": colors.light.primary,
					"secondary": colors.light.secondary,
					"primary-content": colors.light.content,
					"background": colors.light.background,
					"base-100": colors.light.background,
					"base": colors.light.text,
					"border-color": colors.light.borderColor,
					"content": colors.light.content,
				},
				dark: {
					...require("daisyui/src/theming/themes")["dark"],
					"primary": colors.dark.primary,
					"secondary": colors.dark.secondary,
					"primary-content": colors.dark.content,
					"background": colors.dark.background,
					"base-100": colors.dark.background,
					"base": colors.dark.text,
					"border-color": colors.dark.borderColor,
					"content": colors.dark.content,
				},
			},
		],
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("daisyui"),
	],
};