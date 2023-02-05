import type { PageContext } from 'nextjs-effector';
import { attach, createEvent, restore, sample } from 'effector';
import { filtersModel } from 'features/filters';
import { commonApi } from 'shared/api';

export const pageStarted = createEvent<PageContext>();

const getFilmsFx = attach({ effect: commonApi.getFilms });
export const $films = restore(getFilmsFx, null);

sample({
  clock: pageStarted,
  fn: ({ query }) => query,
  filter: Boolean,
  target: [getFilmsFx, filtersModel.$query],
});
