import { createRequestFx } from './create-request-fx';

const INTERNAL_URL = process.env.INTERNAL_API_URL;

const BASE_URL = process.env.API_URL;

const X_API_KEY = process.env.API_TOKEN ?? '';

export const createInternalRequestFx = createRequestFx({
  baseURL: INTERNAL_URL,
  withTokenInHeaders: true,
});

export const createCommonRequestFx = createRequestFx({
  baseURL: BASE_URL,
  headers: {
    'X-API-KEY': X_API_KEY,
  },
});
