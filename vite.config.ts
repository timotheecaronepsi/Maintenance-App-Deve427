import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import {reactRouter} from "@react-router/dev/vite";


export default defineConfig({
  plugins: [!process.env.VITEST ? reactRouter():react(), tailwindcss(), tsconfigPaths()], 
  test: {
    globals: true,
    environment: "jsdom",
  },
});
