import * as openapi from '@openapi-ts/allocation-instruction-v1';

import { OpenAPIBackend } from 'openapi-backend';
import definition from '@token-standard/splice-api-token-allocation-instruction-v1/openapi/allocation-instruction-v1.yaml';
import { defaultNotFoundError, internalError } from '../error';
import allocationInstructionService from './service';

const api = new OpenAPIBackend({
  definition,
  quick: true,
});

const getAllocationFactory = async (): Promise<Response> => {
  try {
    return Response.json({
      factoryId: await allocationInstructionService.getFactoryCID(),
      choiceContext: {
        choiceContextData: {},
        disclosedContracts: [],
      },
    } satisfies openapi.FactoryWithChoiceContext);
  } catch (error) {
    return internalError(`Failed to get allocation factory: ${error}`);
  }
};

api.register({
  getAllocationFactory,
  notFound: () => defaultNotFoundError,
});

await api.init();

export default api;
