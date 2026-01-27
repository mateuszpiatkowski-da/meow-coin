import { serve } from 'bun';
import routes from './routes';
import logger from './util/logger';
import Initializer from './util/init';
import { notFound } from './api/error';
import sdk from './util/walletSDK';

const server = serve({
  port: import.meta.env.PORT || 3001,
  routes,
  fetch() {
    return notFound;
  },
});

// init
await Initializer.getInstance().init();

logger.info(`Server running at ${server.url}`);
