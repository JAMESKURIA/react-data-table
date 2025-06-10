import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		index: "src/index.ts",
		styles: "src/styles.css",
	},
	format: ["cjs", "esm"],
	dts: {
		entry: "src/index.ts",
	},
	splitting: false,
	sourcemap: false,
	clean: true,
	external: ["react", "react-dom"],
	banner: {
		js: '"use client"',
	},
});
