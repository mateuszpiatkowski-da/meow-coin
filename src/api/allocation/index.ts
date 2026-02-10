import * as openapi from '@openapi-ts/allocation-v1';
import { OpenAPIBackend, type Context } from 'openapi-backend';
import definition from '@token-standard/splice-api-token-allocation-v1/openapi/allocation-v1.yaml';
import { defaultNotFoundError, internalError } from '../error';
import allocationService from './service';

const api = new OpenAPIBackend({
  definition,
  quick: true,
});

const getAllocationTransferContext = async (ctx: Context): Promise<Response> => {
  try {
    const contract = await allocationService.getAllocation(ctx.request.params.allocationId);

    return Response.json({
      choiceContextData: {},
      disclosedContracts: [contract],
    } satisfies openapi.ChoiceContext);
  } catch (error) {
    return internalError(
      `Failed to get allocation transfer context for id '${ctx.request.params.allocationId}': ${error}`,
    );
  }
};

const getAllocationWithdrawContext = async (ctx: Context): Promise<Response> => {
  try {
    const contract = await allocationService.getAllocation(ctx.request.params.allocationId);

    return Response.json({
      choiceContextData: {},
      disclosedContracts: [contract],
    } satisfies openapi.ChoiceContext);
  } catch (error) {
    return internalError(
      `Failed to get allocation withdraw context for id '${ctx.request.params.allocationId}': ${error}`,
    );
  }
};

const getAllocationCancelContext = async (ctx: Context): Promise<Response> => {
  try {
    const contract = await allocationService.getAllocation(ctx.request.params.allocationId);

    return Response.json({
      choiceContextData: {},
      disclosedContracts: [contract],
    } satisfies openapi.ChoiceContext);
  } catch (error) {
    return internalError(
      `Failed to get allocation cancel context for id '${ctx.request.params.allocationId}': ${error}`,
    );
  }
};

api.register({
  getAllocationTransferContext,
  getAllocationWithdrawContext,
  getAllocationCancelContext,
  notFound: () => defaultNotFoundError,
});

await api.init();

export default api;
