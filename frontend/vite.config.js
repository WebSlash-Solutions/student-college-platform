import { copyFileSync } from "node:fs";
import react from "@vitejs/plugin-react"
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "gh-pages-404",
      closeBundle() {
        copyFileSync("dist/index.html", "dist/404.html");
      },
    },
  ],
  base: "/student-college-platform/",
})
