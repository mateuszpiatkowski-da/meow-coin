import { serve } from 'bun';
import routes from './routes';
import logger from './util/logger';
import uploadDar from './util/uploadDAR';

const server = serve({
  port: import.meta.env.PORT || 3000,
  routes,
  fetch() {
    return new Response('Not Found', { status: 404 });
  },
});

// init
(async () => {
  await uploadDar();
})();

logger.info(`✓ Server running at ${server.url}`);
