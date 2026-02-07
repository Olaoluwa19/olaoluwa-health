import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
   resolve: {
    alias: {
      // This maps 'assets' to the actual folder path
      'assets': path.resolve(__dirname, './src/assets'),
    },
});
