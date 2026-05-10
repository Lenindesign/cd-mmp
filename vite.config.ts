import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fetchLiveInventory } from './server/liveInventory'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'live-inventory-dev-api',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (!req.url?.startsWith('/.netlify/functions/live-inventory')) {
            next();
            return;
          }

          try {
            const url = new URL(req.url, 'http://localhost');
            const year = Number(url.searchParams.get('year') || '');
            const inventory = await fetchLiveInventory({
              make: url.searchParams.get('make') || '',
              model: url.searchParams.get('model') || '',
              year: Number.isFinite(year) ? year : undefined,
            });

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(inventory));
          } catch (error) {
            res.statusCode = 502;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              error: 'Failed to fetch live inventory',
              details: error instanceof Error ? error.message : 'Unknown error',
            }));
          }
        });
      },
    },
  ],
})
