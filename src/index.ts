import { serve } from 'bun';
import routes from './routes';
import logger from './util/logger';
import Initializer from './util/init';
import { notFound } from './api/error';

const server = serve({
  port: import.meta.env.PORT || 3001,
  routes,
  fetch() {
    return notFound;
  },
});

// const initializer = new Initializer();

// init
// await initializer.init();
// await initializer.uploadDar();
// await initializer.vetPackage();

logger.info(`Server running at ${server.url}`);
