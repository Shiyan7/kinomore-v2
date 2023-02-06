import type { PageContext } from 'nextjs-effector';
import { attach, createEvent, restore, sample } from 'effector';
import { commonApi } from 'shared/api';

export const pageStarted = createEvent<PageContext>();

const getSeriesFx = attach({ effect: commonApi.getCatalog });
export const $series = restore(getSeriesFx, null);

sample({
  clock: pageStarted,
  filter: Boolean,
  fn: ({ query }) => ({ query, type: 2 }),
  target: getSeriesFx,
});
