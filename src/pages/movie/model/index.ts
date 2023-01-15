import type { PageContext } from 'nextjs-effector';
import { attach, createEvent, restore, sample } from 'effector';
import { createToggler } from 'shared/lib/hooks';
import { moviesApi } from 'shared/api';

export const trailerModalToggler = createToggler();
export const shareModalToggler = createToggler();
export const pageStarted = createEvent();

const getMovieByIdFx = attach({ effect: moviesApi.getById });
export const $movie = restore(getMovieByIdFx, null);

sample({
  clock: pageStarted,
  fn: (context: PageContext | void) => context?.params?.id as string,
  target: getMovieByIdFx,
});
