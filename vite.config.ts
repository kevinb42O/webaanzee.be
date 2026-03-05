import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          input: {
            main: path.resolve(__dirname, 'index.html'),
            privacy: path.resolve(__dirname, 'privacy.html'),
            klantenkaart: path.resolve(__dirname, 'klantenkaart.html'),
            blog1: path.resolve(__dirname, 'blog/waarom-website-nodig-2026.html'),
          },
        },
      },
});
