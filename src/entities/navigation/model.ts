import type { ParsedUrlQuery } from 'querystring';
import { attach, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import type { NextRouter } from 'next/router';
import { QueryPayload } from './types';

export const routerUpdated = createEvent();

export const RouterGate = createGate<{ router: NextRouter | null }>();

const $router = createStore<NextRouter | null>(null, {
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

export const pushQuery = createEvent<QueryPayload>();

sample({
  clock: pushQuery,
  source: $router,
  fn: (router, { queryName, value }) => router?.push({ query: { ...router.query, [queryName]: value } }),
});
