import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					"ui-components": [
						"@nextui-org/avatar",
						"@nextui-org/button",
						"@nextui-org/card",
						"@nextui-org/checkbox",
						"@nextui-org/date-picker",
						"@nextui-org/dropdown",
						"@nextui-org/image",
						"@nextui-org/input",
						"@nextui-org/modal",
						"@nextui-org/navbar",
						"@nextui-org/pagination",
						"@nextui-org/progress",
						"@nextui-org/select",
						"@nextui-org/skeleton",
						"@nextui-org/spinner",
						"@nextui-org/switch",
						"@nextui-org/table",
					],
					"ui-core-utils": [
						"@nextui-org/system",
						"@nextui-org/theme",
						"@nextui-org/use-disclosure",
						"@nextui-org/use-infinite-scroll",
					],
					"state-management": ["@reduxjs/toolkit", "react-redux"],
					"data-handling": ["axios", "js-cookie", "jwt-decode"],
					charting: ["chart.js", "react-chartjs-2"],
					utils: ["lodash", "moment"],
					"form-handling": ["@hookform/resolvers", "react-hook-form", "yup"],
					"react-routing": [
						"react",
						"react-dom",
						"react-router-dom",
						"react-helmet-async",
					],
					"toast-notifications": ["react-toastify"],
					"socket-communication": ["socket.io-client"],
					animations: ["framer-motion"],
				},
			},
		},
	},
});
