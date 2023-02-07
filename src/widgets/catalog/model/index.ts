import type { PageContext } from 'nextjs-effector';
import { attach, createEvent, restore, sample } from 'effector';
import { getCatalogType } from 'widgets/catalog';
import { commonApi } from 'shared/api';

export const pageStarted = createEvent<PageContext>();

const getCatalogFx = attach({ effect: commonApi.getCatalog });
export const $catalog = restore(getCatalogFx, null);

sample({
  clock: pageStarted,
  fn: ({ query, pathname }) => ({ ...query, type: getCatalogType(pathname) }),
  target: getCatalogFx,
});
