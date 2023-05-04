import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `popup.js`,
        assetFileNames: (assetInfo) => {
          const { name } = assetInfo;
          const ext = name.split(".")[1];
          if (ext === "css") {
            return "assets/global.[ext]";
          } else {
            return "assets/[name]-[hash][extname]";
          }
        },
      },
    },
  },
  plugins: [preact()],
});
