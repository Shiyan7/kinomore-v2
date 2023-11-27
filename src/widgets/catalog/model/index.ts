import { createEvent, sample } from 'effector';
import type { PageContext } from 'nextjs-effector';
import { atom } from 'shared/factory';
import { catalogQuery } from '../api';
import { getCatalogType } from '../lib';

export const catalogModel = atom(() => {
  const pageStarted = createEvent<PageContext>();

  const { $data } = catalogQuery;

  sample({
    clock: pageStarted,
    fn: ({ pathname, query }) => ({ type: getCatalogType(pathname), ...query }),
    target: catalogQuery.start,
  });

  return {
    pageStarted,
    $data,
  };
});
