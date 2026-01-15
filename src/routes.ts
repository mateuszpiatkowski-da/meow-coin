import metadataApi from './api/metadata';
import { type Request as OpenAPIBackendRequest } from 'openapi-backend';

Promise.all([metadataApi.init()]);

// Adapter to convert Bun Request to OpenAPI Backend Request
const adaptBunRequest = (req: Request): OpenAPIBackendRequest => {
  const url = new URL(req.url);
  return {
    path: url.pathname,
    query: Object.fromEntries(url.searchParams),
    method: req.method,
    headers: Object.fromEntries(req.headers),
    body: req.body,
  };
};

export default {
  '/registry/metadata/*': (req: Request) => {
    return metadataApi.handleRequest(adaptBunRequest(req));
  },
} satisfies Bun.Serve.Routes<undefined, string>;
