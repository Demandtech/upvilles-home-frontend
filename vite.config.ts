import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	// build: {
	// 	rollupOptions: {
	// 		output: {
	// 			manualChunks: {
	// 				nextuiCore: [
	// 					"@nextui-org/system",
	// 					"@nextui-org/theme",
	// 					"@nextui-org/use-disclosure",
	// 					"@nextui-org/use-infinite-scroll",
	// 					"@nextui-org/modal",
	// 				],
	// 				nextuiComponents: [
	// 					"@nextui-org/table",
	// 					"@nextui-org/avatar",
	// 					"@nextui-org/button",
	// 					"@nextui-org/card",
	// 					"@nextui-org/checkbox",
	// 					"@nextui-org/date-picker",
	// 					"@nextui-org/dropdown",
	// 					"@nextui-org/image",
	// 				],
	// 				nextuiUI: [
	// 					"@nextui-org/pagination",
	// 					"@nextui-org/progress",
	// 					"@nextui-org/select",
	// 					"@nextui-org/skeleton",
	// 					"@nextui-org/spinner",
	// 					"@nextui-org/switch",
	// 					"@nextui-org/navbar",
	// 					"@nextui-org/input",
	// 				],
	// 				utils: [
	// 					"js-cookie",
	// 					"jwt-decode",
	// 					"lodash",
	// 					"moment",
	// 					"react-toastify",
	// 					"socket.io-client",
	// 					"yup",
	// 					"@hookform/resolvers",
	// 					"@tanstack/react-query",
	// 					"@tanstack/react-query-devtools",
	// 				],
	// 				vendor: [
	// 					"axios",
	// 					"chart.js",
	// 					"framer-motion",
	// 					"react",
	// 					"react-chartjs-2",
	// 					"react-dom",
	// 					"react-helmet-async",
	// 					"react-hook-form",
	// 					"react-redux",
	// 					"@reduxjs/toolkit",
	// 					"react-router-dom",
	// 				],
	// 			},
	// 		},
	// 	},
	// },
});
