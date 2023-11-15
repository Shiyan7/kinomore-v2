import { restore, sample } from 'effector';
import { createGate } from 'effector-react';
import { commonApi } from 'shared/api';
import { atom } from 'shared/factory';

export const homeModel = atom(() => {
  const HomePageGate = createGate();

  const getNewMoviesFx = commonApi.getNewMovies;
  const $newMovies = restore(getNewMoviesFx, null);

  const getComedyMoviesFx = commonApi.getComedyMovies;
  const $comedyMovies = restore(getComedyMoviesFx, null);

  const getFamilyMoviesFx = commonApi.getFamilyMovies;
  const $familyMovies = restore(getFamilyMoviesFx, null);

  const getDramaMoviesFx = commonApi.getDramaMovies;
  const $dramaMovies = restore(getDramaMoviesFx, null);

  const getFantasticMoviesFx = commonApi.getFantasticMovies;
  const $fantasticMovies = restore(getFantasticMoviesFx, null);

  sample({
    clock: HomePageGate.open,
    target: [getNewMoviesFx, getComedyMoviesFx, getFamilyMoviesFx, getDramaMoviesFx, getFantasticMoviesFx],
  });

  return {
    HomePageGate,
    $newMovies,
    $comedyMovies,
    $familyMovies,
    $dramaMovies,
    $fantasticMovies,
  };
});
