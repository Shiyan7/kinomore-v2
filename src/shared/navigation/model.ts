import type { ParsedUrlQuery } from 'querystring';
import { attach, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import type { NextRouter } from 'next/router';

export const RouterGate = createGate<{ router: NextRouter | null }>();

export const $router = createStore<NextRouter | null>(null, {
  serialize: 'ignore',
})
  .on(RouterGate.open, (_, { router }) => router)
  .reset(RouterGate.close);

export const $query = createStore<ParsedUrlQuery | undefined | null>(null);

sample({
  clock: $router,
  fn: (router) => router?.query,
  target: $query,
});

export const pushFx = attach({
  source: $router,
  effect: (router, url: string) => router?.push(url),
});

export const pushQueryFx = attach({
  source: $router,
  effect: (router, query: ParsedUrlQuery | null) => {
    router?.push({ query: { ...router.query, ...query } });
  },
});
