import { defineConfig } from "vite";

export default defineConfig({
    server: {
        port: 3000,
        open: true,
    },
    preview: {
        port: 8000,
        open: true,
    },
});
