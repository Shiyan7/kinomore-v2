import { attach, createEvent, restore, sample } from 'effector';
import { commonApi } from 'shared/api';
import { appStarted } from 'shared/config';

export const pageStarted = createEvent();

const getNewMoviesFx = attach({ effect: commonApi.getNewMovies });
export const $newMovies = restore(getNewMoviesFx, null);

const getComedyMoviesFx = attach({ effect: commonApi.getComedyMovies });
export const $comedyMovies = restore(getComedyMoviesFx, null);

const getFamilyMoviesFx = attach({ effect: commonApi.getFamilyMovies });
export const $familyMovies = restore(getFamilyMoviesFx, null);

const getDramaMoviesFx = attach({ effect: commonApi.getDramaMovies });
export const $dramaMovies = restore(getDramaMoviesFx, null);

const getFantasticMoviesFx = attach({ effect: commonApi.getFantasticMovies });
export const $fantasticMovies = restore(getFantasticMoviesFx, null);

sample({
  clock: appStarted,
  target: [getNewMoviesFx, getComedyMoviesFx, getFamilyMoviesFx, getDramaMoviesFx, getFantasticMoviesFx],
});
