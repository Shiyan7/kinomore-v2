import { attach, restore, sample } from 'effector';
import { createGate } from 'effector-react';
import { commonApi } from 'shared/api';
import { atom } from 'shared/factory';

export const homeModel = atom(() => {
  const HomeGate = createGate();

  const getNewMoviesFx = attach({ effect: commonApi.getNewMovies });
  const $newMovies = restore(getNewMoviesFx, null);

  const getComedyMoviesFx = attach({ effect: commonApi.getComedyMovies });
  const $comedyMovies = restore(getComedyMoviesFx, null);

  const getFamilyMoviesFx = attach({ effect: commonApi.getFamilyMovies });
  const $familyMovies = restore(getFamilyMoviesFx, null);

  const getDramaMoviesFx = attach({ effect: commonApi.getDramaMovies });
  const $dramaMovies = restore(getDramaMoviesFx, null);

  const getFantasticMoviesFx = attach({ effect: commonApi.getFantasticMovies });
  const $fantasticMovies = restore(getFantasticMoviesFx, null);

  sample({
    clock: HomeGate.open,
    target: [getNewMoviesFx, getComedyMoviesFx, getFamilyMoviesFx, getDramaMoviesFx, getFantasticMoviesFx],
  });

  return {
    HomeGate,
    $newMovies,
    $comedyMovies,
    $familyMovies,
    $dramaMovies,
    $fantasticMovies,
  };
});
