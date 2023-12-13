import { createEvent, sample } from 'effector';
import { atom } from 'shared/factory';
import type { NextPageContext } from 'next';
import { catalogQuery } from '../api';
import { getCatalogType } from '../lib';

export const catalogModel = atom(() => {
  const pageStarted = createEvent<NextPageContext>();

  const { $data } = catalogQuery;

  sample({
    clock: pageStarted,
    fn: ({ pathname, query }) => ({ type: getCatalogType(pathname), ...query }),
    target: catalogQuery.refresh,
  });

  return {
    pageStarted,
    $data,
  };
});
