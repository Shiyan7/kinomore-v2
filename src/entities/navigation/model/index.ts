import { createEvent, createStore, sample } from 'effector';
import type { NextRouter } from 'next/router';

export const routerUpdated = createEvent<NextRouter | null>();
export const $isRouterDirty = createStore(true);

sample({
  clock: routerUpdated,
  filter: Boolean,
  fn: () => false,
  target: $isRouterDirty,
});
