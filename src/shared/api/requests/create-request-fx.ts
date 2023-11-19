import { createEffect } from 'effector';
import { ofetch, type FetchOptions } from 'ofetch';

type CreateRequestParams = FetchOptions & {
  url: string;
};

type Fn<P> = (params: P) => CreateRequestParams;

type Payload<P> = CreateRequestParams | Fn<P>;

type CreateRequestInstanceParams<P> = CreateRequestParams & {
  withTokenInHeaders?: boolean;
  payload: Payload<P>;
};

function getConfig<P>(payload: Payload<P>, params: P): CreateRequestParams {
  return typeof payload === 'function' ? payload(params) : payload;
}

const createRequestInstance = <P = CreateRequestParams, R = void>({
  baseURL,
  headers,
  payload,
  withTokenInHeaders,
}: CreateRequestInstanceParams<P>) =>
  createEffect<P, R>((params) => {
    const { url, ...fetchOptions } = getConfig(payload, params);

    const newHeaders = new Headers(headers);

    if (withTokenInHeaders) {
      newHeaders.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    }

    return ofetch(url, {
      ...fetchOptions,
      headers: newHeaders,
      baseURL,
    });
  });

export const createRequestFx =
  (params: Omit<CreateRequestInstanceParams<CreateRequestParams>, 'payload' | 'url'>) =>
  <P = CreateRequestParams, R = void>(payload: Payload<P>) =>
    createRequestInstance<P, R>({ ...(params as CreateRequestInstanceParams<P>), payload });
