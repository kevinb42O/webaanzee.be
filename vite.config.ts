import path from 'path';
import { stat } from 'node:fs/promises';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        {
          name: 'serve-generated-directory-pages',
          configureServer(server) {
            // Vite's public middleware does not resolve directory indexes. Serve
            // generated pages before its SPA fallback can return the homepage.
            server.middlewares.use(async (req, _res, next) => {
              if (!req.url || !['GET', 'HEAD'].includes(req.method ?? 'GET')) return next();
              const url = new URL(req.url, 'http://localhost');
              if (!url.pathname.endsWith('/')) return next();
              const publicDir = path.resolve(server.config.publicDir);
              const indexFile = path.resolve(publicDir, `.${url.pathname}`, 'index.html');
              if (!indexFile.startsWith(publicDir + path.sep)) return next();
              try {
                if ((await stat(indexFile)).isFile()) {
                  req.url = `${url.pathname}index.html${url.search}`;
                }
              } catch {
                // Leave missing pages to Vite's usual handling.
              }
              next();
            });
          },
        },
        react(),
      ],
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
            pwayment: path.resolve(__dirname, 'pwayment.html'),
            blog1: path.resolve(__dirname, 'blog/waarom-website-nodig-2026.html'),
          },
        },
      },
});
