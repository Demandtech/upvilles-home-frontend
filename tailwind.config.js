const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@nextui-org/theme/dist/components/(avatar|button|card|checkbox|date-picker|dropdown|image|input|modal|navbar|pagination|progress|circular-progress|select|skeleton|spinner|toggle|table|ripple|calendar|date-input|popover|menu|divider|listbox|scroll-shadow|spacer).js",
	],
	theme: {
		extend: {
			colors: {
				primary: `hsla(var(--primary))`,
				default: `hsla(var(--default))`,
				secondary: `hsla(var(--secondary))`,
				accent: `hsla(var(--accent))`,
				lightGrey: `hsla(var(--lightGrey))`,
				darkGrey: "#667185",
				lightBg: "#fafafa",
				danger: `hsla(var(--danger))`,
			},
		},
	},
	plugins: [nextui()],
};
