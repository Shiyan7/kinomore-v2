import { attach, createEvent, restore, sample } from 'effector';
import { commonApi, internalApi } from 'shared/api';

export const pageStarted = createEvent();

const getNewMoviesFx = attach({ effect: commonApi.getNewMovies });
export const $newMovies = restore(getNewMoviesFx, null);

const getComedyMoviesFx = attach({ effect: commonApi.getComedyMovies });
export const $comedyMovies = restore(getComedyMoviesFx, null);

const getFamilyMoviesFx = attach({ effect: commonApi.getFamilyMovies });
export const $familyMovies = restore(getFamilyMoviesFx, null);

const getDramaMoviesFx = attach({ effect: commonApi.getDramaMovies });
export const $dramaMovies = restore(getDramaMoviesFx, null);

const getHeroMoviesFx = attach({ effect: internalApi.getHeroMovies });
export const $heroMovies = restore(getHeroMoviesFx, []);

sample({
  clock: pageStarted,
  target: [getHeroMoviesFx, getNewMoviesFx, getComedyMoviesFx, getFamilyMoviesFx, getDramaMoviesFx],
});
