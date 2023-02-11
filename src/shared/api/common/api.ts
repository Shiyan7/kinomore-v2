import { GenresEnum } from 'shared/config';
import { getCurrentYear, getYears } from 'shared/lib/get-year';
import { http } from './config';
import type { CatalogParams, Data, Movie, MovieCard, Person } from './types';

const routesConfig = http.createRoutesConfig({
  getNewMovies: http.createRoute<number | void, Data<MovieCard>>({
    url: '/movie',
    params: {
      'search[]': '5-9',
      'field[]': 'rating.kp',
      search: getCurrentYear(),
      field: 'year',
      sortField: 'votes.filmCritics',
      sortType: '-1',
      limit: 15,
    },
  }),
  getComedyMovies: http.createRoute<void, Data<MovieCard>>({
    url: '/movie',
    params: {
      search: [getCurrentYear(), '7-10', '1', '!null', '!null', '!null'],
      field: ['year', 'rating.kp', 'typeNumber', 'name', 'votes.kp', 'poster.previewUrl'],
      sortField: 'year',
      sortType: '-1',
      'search[]': GenresEnum.Komediya,
      'field[]': 'genres.name',
      limit: 15,
    },
  }),
  getFamilyMovies: http.createRoute<number | void, Data<MovieCard>>({
    url: '/movie',
    params: {
      'search[]': [GenresEnum.Semejnyj, '1-10', '!null'],
      'field[]': ['genres.name', 'rating.kp', 'poster.previewUrl'],
      search: [getYears(), '!null', '!null'],
      field: ['year', 'name', 'votes.kp'],
      sortField: 'year',
      sortType: '-1',
      limit: 15,
    },
  }),
  searchByName: http.createRoute<string | void, Data<MovieCard>>((query) => ({
    url: '/movie',
    params: {
      search: [query, '!null', getYears()],
      field: ['name', 'poster.previewUrl', 'year'],
      'sortField[]': 'votes.kp',
      'sortType[]': '-1',
      sortField: 'year',
      sortType: '-1',
      isStrict: false,
      limit: 30,
    },
  })),
  getCatalog: http.createRoute<CatalogParams, Data<MovieCard>>(
    ({ type, limit, genre, rating = '1', sort, year = getYears() }) => ({
      url: `/movie`,
      params: {
        search: [type, '!null', year, `${rating}-10`, genre],
        field: ['typeNumber', 'poster.previewUrl', 'year', 'rating.kp', genre ? 'genres.name' : null],
        'sortField[]': [sort, 'votes.kp'],
        'sortType[]': ['-1', '-1'],
        limit,
      },
    })
  ),
  getMovieById: http.createRoute<string, Movie>((id) => ({
    url: '/movie',
    params: {
      search: id,
      field: 'id',
    },
  })),
  getPersonById: http.createRoute<string, Person>((id) => ({
    url: '/person',
    params: {
      search: id,
      field: 'id',
    },
  })),
});

export const commonApi = routesConfig.build();
