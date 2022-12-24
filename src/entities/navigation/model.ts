import { createEvent, createStore, sample, restore } from "effector";
import type { NextRouter } from "next/router";

export const historyChanged = createEvent<string>();
export const beforePopstateChanged = createEvent();
export const routerUpdated = createEvent<NextRouter | null>();

export const $isRouterDirty = createStore(true);
export const $url = restore(historyChanged, "");

sample({
  clock: routerUpdated,
  filter: Boolean,
  fn: () => false,
  target: $isRouterDirty,
});
