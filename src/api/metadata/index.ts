import { OpenAPIBackend, type Handler } from 'openapi-backend';
import definition from '@token-api/openapi/token-metadata-v1.yaml';
import * as types from './types';

const api = new OpenAPIBackend({ definition, quick: true });

const getRegistryInfo: Handler = () => {
  const adminId = 'test-coin-admin-id';
  const supportedApis = {
    'splice-api-token-metadata-v1': 1,
    'splice-api-token-holding-v1': 1,
    'splice-api-token-transfer-instruction-v1': 1,
    'splice-api-token-allocation-v1': 1,
    'splice-api-token-allocation-instruction-v1': 1,
    'splice-api-token-allocation-request-v1': 1,
  };
  return Response.json({
    adminId,
    supportedApis,
  } satisfies types.operations['getRegistryInfo']['responses']['200']['content']['application/json']);
};

const listInstruments: Handler = (ctx) => {
  const query = ctx.request.query;
  console.log('query', query);
  return Response.json({
    instruments: [],
    // nextPageToken: 0
  } satisfies types.operations['listInstruments']['responses']['200']['content']['application/json']);
};

const getInstrument: Handler = (ctx) => {
  console.log(ctx);
};

api.register({
  getRegistryInfo,
  listInstruments,
  getInstrument,
  validationFail: (ctx) => {
    return Response.json(
      {
        error: ctx.validation.errors,
      },
      { status: 400 },
    );
  },
});

export default api;
