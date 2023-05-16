import type { PageContext } from 'nextjs-effector';
import { attach, createEvent, restore, sample } from 'effector';
import { createToggler } from 'shared/lib/toggler';
import { commonApi } from 'shared/api';

export const trailerToggler = createToggler();
export const shareToggler = createToggler();
export const playerToggler = createToggler();
export const pageStarted = createEvent<PageContext>();

const getMovieByIdFx = attach({ effect: commonApi.getMovieById });
export const $movie = restore(getMovieByIdFx, null);

sample({
  clock: pageStarted,
  fn: ({ params }) => params?.id as string,
  target: getMovieByIdFx,
});
