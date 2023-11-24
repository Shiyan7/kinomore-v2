import { combine, createEvent, createStore, sample } from 'effector';
import type { PageContext } from 'nextjs-effector';
import { atom } from 'shared/factory';
import { catalogQuery } from '../api';
import { getCatalogType } from '../lib';

export const catalogModel = atom(() => {
  const pageStarted = createEvent<PageContext>();

  const loadMore = createEvent();

  const $hasMore = createStore(false);

  const $limit = createStore(30)
    .on(loadMore, (state) => state + 60)
    .reset(pageStarted);

  const $pageContext = createStore<PageContext | null>(null);

  const $catalog = catalogQuery.$data;

  sample({
    clock: pageStarted,
    target: $pageContext,
  });

  const $params = combine({ context: $pageContext, limit: $limit });

  sample({
    clock: [pageStarted, loadMore],
    source: $params,
    fn: ({ limit, context }) => ({
      ...context?.query,
      limit,
      type: getCatalogType(context?.pathname ?? ''),
    }),
    target: catalogQuery.start,
  });

  const { $pending } = catalogQuery;

  sample({
    clock: catalogQuery.finished.success,
    source: $limit,
    fn: (limit, { result }) => result.total > limit,
    target: $hasMore,
  });

  return {
    pageStarted,
    $catalog,
    loadMore,
    $hasMore,
    $limit,
    $pending,
  };
});
