// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    envPrefix: "APP_",
    base: "/",
    build: {
      outDir:
        mode === "production"
          ? "dist/prod_build"
          : mode === "development"
          ? "dist/dev_build"
          : mode === "qa"
          ? "dist/qa_build"
          : "dist/uat_build",
    },
  };
});
