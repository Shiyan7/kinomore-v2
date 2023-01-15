import { GenresEnum, LIMIT } from 'shared/config';
import { getCurrentYear, getYears } from 'shared/lib/get-year';
import { http, url } from './base';
import type { Data, IMovie, IMovieItem } from './types';

const routesConfig = http.createRoutesConfig({
  getNew: http.createRoute<number | void, Data<IMovieItem>>((limit = LIMIT) => ({
    url,
    params: {
      'search[]': '5-9',
      'field[]': 'rating.kp',
      search: getCurrentYear(),
      field: 'year',
      sortField: 'votes.filmCritics',
      sortType: '-1',
      limit,
    },
  })),
  getComedy: http.createRoute<number | void, Data<IMovieItem>>((limit = LIMIT) => ({
    url,
    params: {
      search: [getCurrentYear(), '7-10', '1', '!null', '!null', '!null'],
      field: ['year', 'rating.kp', 'typeNumber', 'name', 'votes.kp', 'poster.previewUrl'],
      sortField: 'year',
      sortType: '-1',
      'search[]': GenresEnum.Komediya,
      'field[]': 'genres.name',
      limit,
    },
  })),
  forFamily: http.createRoute<number | void, Data<IMovieItem>>((limit = LIMIT) => ({
    url,
    params: {
      'search[]': [GenresEnum.Semejnyj, '1-10', '!null'],
      'field[]': ['genres.name', 'rating.kp', 'poster.previewUrl'],
      search: [getYears(), '!null', '!null'],
      field: ['year', 'name', 'votes.kp'],
      sortField: 'year',
      sortType: '-1',
      limit,
    },
  })),
  searchByName: http.createRoute<string | void, Data<IMovieItem>>((query) => ({
    url,
    params: {
      search: [query, '!null', getYears()],
      field: ['name', 'poster.previewUrl', 'year'],
      limit: 30,
      sortField: 'year',
      sortType: '-1',
      isStrict: false,
    },
  })),
  getById: http.createRoute<string, IMovie>((id) => ({
    url,
    params: {
      search: id,
      field: 'id',
    },
  })),
});

const moviesApi = routesConfig.build();

export { moviesApi };
