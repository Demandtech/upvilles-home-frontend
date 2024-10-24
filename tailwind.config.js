const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@nextui-org/theme/dist/components/(button|image|navbar|ripple|spinner).js",
	],
	theme: {
		extend: {
			colors: {
				primary: `hsla(var(--primary))`,
				default: `hsla(var(--default))`,
				secondary: `hsla(var(--secondary))`,
				accent: `hsla(var(--accent))`,
				lightGrey: `hsla(var(--lightGrey))`,
			},
		},
	},
	plugins: [nextui()],
};
