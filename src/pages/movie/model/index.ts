import type { PageContext } from 'nextjs-effector';
import { attach, createEvent, restore, sample } from 'effector';
import { favoritesModel } from 'features/favorites';
import { createToggler } from 'shared/lib/toggler';
import { commonApi, internalApi } from 'shared/api';

export const pageStarted = createEvent<PageContext>();
export const clientStarted = createEvent<PageContext>();

export const trailerToggler = createToggler();
export const shareToggler = createToggler();
export const playerToggler = createToggler();

const getMovieByIdFx = attach({ effect: commonApi.getMovieById });
const checkFavoriteFx = attach({ effect: internalApi.checkFavorite });
export const $movie = restore(getMovieByIdFx, null);

sample({
  clock: pageStarted,
  fn: ({ params }) => params?.id as string,
  target: getMovieByIdFx,
});

sample({
  clock: clientStarted,
  fn: ({ params }) => params?.id as string,
  target: checkFavoriteFx,
});

sample({
  clock: checkFavoriteFx.doneData,
  target: favoritesModel.$isFavorite,
});
