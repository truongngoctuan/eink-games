import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
// import legacy from '@vitejs/plugin-legacy'
import reactSwc from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    allowedHosts: ["270a-203-211-106-135.ngrok-free.app"],
  }
});
