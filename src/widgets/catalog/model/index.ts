import { attach, combine, createEvent, createStore, restore, sample } from 'effector';
import type { PageContext } from 'nextjs-effector';
import { commonApi } from 'shared/api';
import { atom } from 'shared/factory';
import { getCatalogType } from '../lib';

export const catalogModel = atom(() => {
  const pageStarted = createEvent<PageContext>();

  const getCatalogFx = attach({ effect: commonApi.getCatalog });

  const $catalog = restore(getCatalogFx, null);

  const loadMore = createEvent();

  const $hasMore = createStore(false);

  const $limit = createStore(30)
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

  const $pending = getCatalogFx.pending;

  sample({
    clock: getCatalogFx.doneData,
    source: $limit,
    fn: (limit, { total }) => total > limit,
    target: $hasMore,
  });

  return {
    pageStarted,
    getCatalogFx,
    $catalog,
    loadMore,
    $hasMore,
    $limit,
    $pending,
  };
});
