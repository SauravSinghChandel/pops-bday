import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  assetsInclude: ["**/*.JPG", "**/*.heic", "**/*.heif", "**/*.HEIC", "**/*.HEIF"],
  base: "/pops-bday/",
  plugins: [react()],
});
