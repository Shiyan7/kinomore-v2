import { attach, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import type { NextRouter } from 'next/router';

export const routerUpdated = createEvent<NextRouter | null>();

export const RouterGate = createGate<{ router: NextRouter | null }>();

const $router = createStore<NextRouter | null>(null, {
  serialize: 'ignore',
})
  .on(RouterGate.open, (_, { router }) => router)
  .reset(RouterGate.close);

export const push = createEvent<string>();

export const pushFx = attach({
  source: $router,
  effect: (router, url: string) => router?.push(url),
});

sample({
  clock: push,
  target: pushFx,
});
