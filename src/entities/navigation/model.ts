import type { ParsedUrlQuery } from 'querystring';
import type { NextRouter } from 'next/router';
import { attach, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';

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

export const push = createEvent<string>();

export const pushFx = attach({
  source: $router,
  effect: (router, url: string) => router?.push(url),
});

sample({
  clock: push,
  target: pushFx,
});

export const pushQuery = createEvent<ParsedUrlQuery | null>();

sample({
  clock: pushQuery,
  source: $router,
  fn: (router, query) => router?.push({ query: { ...router.query, ...query } }),
});
