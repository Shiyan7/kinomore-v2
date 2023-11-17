import { restore, sample } from 'effector';
import { createGate } from 'effector-react';
import {
  getNewMoviesFx,
  getComedyMoviesFx,
  getFamilyMoviesFx,
  getDramaMoviesFx,
  getFantasticMoviesFx,
} from 'shared/api';
import { atom } from 'shared/factory';

export const homeModel = atom(() => {
  const HomePageGate = createGate();

  const $newMovies = restore(getNewMoviesFx, null);

  const $comedyMovies = restore(getComedyMoviesFx, null);

  const $familyMovies = restore(getFamilyMoviesFx, null);

  const $dramaMovies = restore(getDramaMoviesFx, null);

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
