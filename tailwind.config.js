/** @type {import('tailwindcss').Config} */
const { colors } = require("./lib/colors");
const { headingFont, textFont } = require("./lib/constants");

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@primer/react-brand/dist/**/*.{js,ts,jsx,tsx}",
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
				// sm: "0.8rem",
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
				"gradient-xy": "gradient-xy 15s ease infinite",
			},
			keyframes: {
				"gradient-xy": {
					"0%, 100%": {
						"background-size": "400% 400%",
						"background-position": "left center",
					},
					"50%": {
						"background-size": "200% 200%",
						"background-position": "right center",
					},
				},
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
			},
			borderRadius: {
				large: "1rem",
				medium: "0.5rem",
				small: "0.25rem",
			},
		},
	},
	daisyui: {
		themes: [
			{
				light: {
					...require("daisyui/src/theming/themes")["light"],
					primary: colors.light.primary,
					secondary: colors.light.secondary,
					"primary-content": colors.light.content,
					background: colors.light.background,
					"base-100": colors.light.background,
					base: colors.light.text,
					"border-color": colors.light.borderColor,
					content: colors.light.content,
					"gradient-start": colors.light.gradientStart,
					"gradient-end": colors.light.gradientEnd,
					"--tw-gradient-start": colors.light.gradientStart,
					"--tw-gradient-end": colors.light.gradientEnd,
				},
				dark: {
					...require("daisyui/src/theming/themes")["dark"],
					primary: colors.dark.primary,
					secondary: colors.dark.secondary,
					"primary-content": colors.dark.content,
					background: colors.dark.background,
					"base-100": colors.dark.background,
					base: colors.dark.text,
					colors: { "gradient-start": colors.light.gradientStart },
					"border-color": colors.dark.borderColor,
					content: colors.dark.content,
					"gradient-start": colors.dark.gradientStart,
					"gradient-end": colors.dark.gradientEnd,
					"--tw-gradient-start": colors.dark.gradientStart,
					"--tw-gradient-end": colors.dark.gradientEnd,
				},
			},
		],
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				".gradient-text": {
					background: `linear-gradient(90deg, ${colors.light.primary}, ${colors.light.secondary})`,
					"-webkit-background-clip": "text",
					"-webkit-text-fill-color": "transparent",
				},
			});
		},
		require("@tailwindcss/typography"),
		require("daisyui"),
	],
};
