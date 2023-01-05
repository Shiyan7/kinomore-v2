import { attach, createEvent, restore, sample } from 'effector';
import { moviesApi, internalApi } from 'shared/api';

export const pageStarted = createEvent();

const getNewFilmsFx = attach({ effect: moviesApi.getNew });
export const $newFilms = restore(getNewFilmsFx, null);

const getComedyFilmsFx = attach({ effect: moviesApi.getComedy });
export const $comedyFilms = restore(getComedyFilmsFx, null);

const getForFamilyFx = attach({ effect: moviesApi.forFamily });
export const $forFamily = restore(getForFamilyFx, null);

const getHeroMoviesFx = attach({ effect: internalApi.getHeroMovies });
export const $heroMovies = restore(getHeroMoviesFx, []);

sample({
  clock: pageStarted,
  target: [getHeroMoviesFx, getNewFilmsFx, getComedyFilmsFx, getForFamilyFx],
});
