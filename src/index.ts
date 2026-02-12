import { serve } from 'bun';
import routes from './routes';
import logger from './util/logger';
import initializer from './util/init';
import { defaultNotFoundError } from './api/error';
import sdk from './util/walletSDK';

const server = serve({
  port: process.env.PORT || 3001,
  routes,
  fetch() {
    return defaultNotFoundError;
  },
});

logger.info({ adminToken: await sdk.auth.getAdminToken() }, `Admin Token for API auth:`);

// Initialize prerequisites
await initializer.init();

logger.info(`Server running at ${server.url}`);
