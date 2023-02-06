import type { PageContext } from 'nextjs-effector';
import { attach, createEvent, restore, sample } from 'effector';
import { commonApi } from 'shared/api';

export const pageStarted = createEvent<PageContext>();

const getCartoonsFx = attach({ effect: commonApi.getCatalog });
export const $cartoons = restore(getCartoonsFx, null);

sample({
  clock: pageStarted,
  filter: Boolean,
  fn: ({ query }) => ({ query, type: 3 }),
  target: getCartoonsFx,
});
