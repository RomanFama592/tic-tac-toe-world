import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    server: {
        port: 8081
    },
    vite: {
        // use "usePolling: true" in case of using dev container, otherwise set to "false" 
        server: {
            watch: {
                usePolling: true
            }
        }
    },
    integrations: [react(), tailwindcss()]
});
