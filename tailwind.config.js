/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["'Quicksand'", "sans-serif"],
			},
			keyframes: {
				wave: {
					"0%": {transform: "translate(-100%)"},
					"50%": {transform: "translate(50%)"},
					"100%": {transform: "translate(100%)"},
				},
			},
			animation: {
				"waving-hand": "wave 1.2s linear infinite",
			},
		},
	},

	plugins: [require("@tailwindcss/forms")],
};
