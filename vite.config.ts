import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default defineConfig({
	plugins: [react()],
	build: {
		chunkSizeWarningLimit: 700,
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					if (id.includes("node_modules")) {
						if (id.includes("@nextui-org")) {
							return "nextui";
						} else if (id.includes("@tanstack")) {
							return "tanstack";
						} else if (id.includes("react-")) {
							return "react";
						}

						return "vendor";
					}
				},
			},
		},
	},
});
