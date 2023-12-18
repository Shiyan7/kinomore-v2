import { createRequestFx } from './create-request-fx';

export const createInternalRequestFx = createRequestFx({
  baseURL: process.env.INTERNAL_API_URL,
  withTokenInHeaders: true,
});

export const createCommonRequestFx = createRequestFx({
  baseURL: process.env.API_URL,
  headers: {
    'X-API-KEY': process.env.API_TOKEN ?? '',
  },
});
