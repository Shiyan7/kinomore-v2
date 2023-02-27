import type { PageContext } from 'nextjs-effector';
import { attach, combine, createEvent, createStore, restore, sample } from 'effector';
import { commonApi } from 'shared/api';
import { getCatalogType } from '../lib';

export const pageStarted = createEvent<PageContext>();

export const getCatalogFx = attach({ effect: commonApi.getCatalog });
export const $catalog = restore(getCatalogFx, null);

export const loadMore = createEvent();

export const $hasMore = createStore(false);

export const $limit = createStore(30)
  .on(loadMore, (state) => state + 60)
  .reset(pageStarted);

const $pageContext = createStore<PageContext | null>(null);

sample({
  clock: pageStarted,
  target: $pageContext,
});

const $params = combine({ context: $pageContext, limit: $limit });

sample({
  clock: [pageStarted, loadMore],
  source: $params,
  fn: ({ limit, context }) => ({ ...context?.query, limit, type: getCatalogType(context?.pathname ?? '') }),
  target: getCatalogFx,
});

export const $pending = getCatalogFx.pending;

sample({
  clock: getCatalogFx.doneData,
  source: $limit,
  fn: (limit, { total }) => total > limit,
  target: $hasMore,
});
