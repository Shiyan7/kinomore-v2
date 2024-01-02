import { createQuery } from '@farfetched/core';
import { createCommonRequestFx } from 'shared/api/requests';
import type { Movies } from 'shared/api/types';
import { GenresEnum, CURRENT_YEAR } from 'shared/config';

export const newMoviesQuery = createQuery({
  effect: createCommonRequestFx<void, Movies>({
    url: '/v1.3/movie',
    params: {
      'rating.kp': '5-9',
      year: CURRENT_YEAR,
      sortField: 'votes.filmCritics',
      sortType: '-1',
      limit: 15,
    },
  }),
});

export const comedyMoviesQuery = createQuery({
  effect: createCommonRequestFx<void, Movies>({
    url: '/v1.3/movie',
    params: {
      year: CURRENT_YEAR,
      type: 'movie',
      name: '!null',
      'rating.kp': '7-10',
      'votes.kp': '!null',
      'poster.previewUrl': '!null',
      'genres.name': GenresEnum.Comedy,
      limit: 15,
    },
  }),
});

export const familyMoviesQuery = createQuery({
  effect: createCommonRequestFx<void, Movies>({
    url: '/v1.3/movie',
    params: {
      'genres.name': GenresEnum.Family,
      'poster.previewUrl': '!null',
      year: CURRENT_YEAR,
      name: '!null',
      sortField: 'votes.imdb',
      sortType: '-1',
      limit: 15,
    },
  }),
});

export const dramaMoviesQuery = createQuery({
  effect: createCommonRequestFx<void, Movies>({
    url: '/v1.3/movie',
    params: {
      year: CURRENT_YEAR,
      'genres.name': GenresEnum.Drama,
      'poster.previewUrl': '!null',
      name: '!null',
      sortField: 'votes.kp',
      sortType: '-1',
      limit: 15,
    },
  }),
});

export const fantasticMoviesQuery = createQuery({
  effect: createCommonRequestFx<void, Movies>({
    url: '/v1.3/movie',
    params: {
      'genres.name': GenresEnum.ScienceFiction,
      'poster.previewUrl': '!null',
      year: CURRENT_YEAR,
      name: '!null',
      sortField: 'votes.kp',
      sortType: '-1',
      limit: 15,
    },
  }),
});
