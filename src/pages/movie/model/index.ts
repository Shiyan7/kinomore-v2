import { attach, createEvent, restore, sample } from 'effector';
import { createGate } from 'effector-react';
import type { PageContext } from 'nextjs-effector';
import { favoritesModel } from 'features/favorites';
import { tokenService } from 'entities/session';
import { commonApi, internalApi } from 'shared/api';
import { atom } from 'shared/factory';
import { createToggler } from 'shared/lib/toggler';

export const movieModel = atom(() => {
  const pageStarted = createEvent<PageContext>();
  const MovieGate = createGate<{ movieId: string }>();

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
    clock: MovieGate.open,
    filter: tokenService.hasAccessToken,
    fn: ({ movieId }) => movieId,
    target: checkFavoriteFx,
  });

  sample({
    clock: checkFavoriteFx.doneData,
    target: favoritesModel.$isFavorite,
  });

  return {
    pageStarted,
    MovieGate,
    trailerToggler,
    shareToggler,
    playerToggler,
    $movie,
  };
});
