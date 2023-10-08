import { attach, createEvent, restore, sample } from 'effector';
import type { PageContext } from 'nextjs-effector';
import { favoritesModel } from 'features/favorites';
import { commonApi, internalApi } from 'shared/api';
import { atom } from 'shared/factory';
import { createToggler } from 'shared/lib/toggler';

export const movieModel = atom(() => {
  const pageStarted = createEvent<PageContext>();
  const clientStarted = createEvent<PageContext>();

  const trailerToggler = createToggler();
  const shareToggler = createToggler();
  const playerToggler = createToggler();

  const getMovieByIdFx = attach({ effect: commonApi.getMovieById });
  const checkFavoriteFx = attach({ effect: internalApi.checkFavorite });
  const $movie = restore(getMovieByIdFx, null);

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

  return {
    pageStarted,
    clientStarted,
    trailerToggler,
    shareToggler,
    playerToggler,
    $movie,
  };
});
