// Netlify-specific build config: produces a fully static site (dist/client)
// that can be drag-and-dropped onto Netlify. The main vite.config.ts is untouched.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
    spa: {
      enabled: true,
      prerender: { enabled: true, outputPath: "/index.html" },
    },
  },
  nitro: {
    preset: "static",
  },
});
