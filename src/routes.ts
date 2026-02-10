import metadataApi from './api/metadata';
import transferInstructionApi from './api/transfer-instruction';
import allocationInstructionApi from './api/allocation-instruction';
import allocationApi from './api/allocation';
import { type Request as OpenAPIBackendRequest } from 'openapi-backend';
import { type BunRequest, type Serve } from 'bun';

// Adapter to convert Bun Request to OpenAPI Backend Request
const adaptBunRequest = (req: BunRequest): OpenAPIBackendRequest => {
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
  '/registry/metadata/v1/*': async (req: BunRequest) => {
    return await metadataApi.handleRequest(adaptBunRequest(req));
  },
  '/registry/transfer-instruction/v1/*': async (req: BunRequest) => {
    return await transferInstructionApi.handleRequest(adaptBunRequest(req));
  },
  '/registry/allocation-instruction/v1/*': async (req: BunRequest) => {
    return await allocationInstructionApi.handleRequest(adaptBunRequest(req));
  },
  '/registry/allocations/v1/*': async (req: BunRequest) => {
    return await allocationApi.handleRequest(adaptBunRequest(req));
  },
} satisfies Serve.Routes<undefined, string>;
