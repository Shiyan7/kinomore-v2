import { GenresEnum } from 'shared/config';
import { getCurrentYear, getYears } from 'shared/lib/date';
import { http } from './config';
import type { CatalogParams, Data, Movie, MovieEntity, Person, SearchMovieEntity, SearchParams } from './types';

const LIMIT = 15;

const routesConfig = http.createRoutesConfig({
  getMovieById: http.createRoute<string, Movie>((id) => ({
    url: `/v1.3/movie/${id}`,
  })),
  getPersonById: http.createRoute<string, Person>((id) => ({
    url: `/v1/person/${id}`,
  })),
  getCatalog: http.createRoute<CatalogParams, Data<MovieEntity>>(
    ({ type, limit, genre, rating = '1-10', sort, year = getYears() }) => ({
      url: '/v1.3/movie',
      params: {
        year,
        typeNumber: type,
        'genres.name': genre,
        'rating.kp': rating,
        'poster.previewUrl': '!null',
        sortField: [sort, 'votes.kp'],
        sortType: ['-1', '-1'],
        limit,
      },
    }),
  ),
  getNewMovies: http.createRoute<void, Data<MovieEntity>>({
    url: '/v1.3/movie',
    params: {
      'rating.kp': '5-9',
      year: getCurrentYear(),
      sortField: 'votes.filmCritics',
      sortType: '-1',
      limit: LIMIT,
    },
  }),
  getComedyMovies: http.createRoute<void, Data<MovieEntity>>({
    url: '/v1.3/movie',
    params: {
      year: getCurrentYear(),
      type: 'movie',
      name: '!null',
      'rating.kp': '7-10',
      'votes.kp': '!null',
      'poster.previewUrl': '!null',
      'genres.name': GenresEnum.Comedy,
      limit: LIMIT,
    },
  }),
  getFamilyMovies: http.createRoute<void, Data<MovieEntity>>({
    url: '/v1.3/movie',
    params: {
      'genres.name': GenresEnum.Family,
      'poster.previewUrl': '!null',
      year: getCurrentYear(),
      name: '!null',
      sortField: 'votes.imdb',
      sortType: '-1',
      limit: LIMIT,
    },
  }),
  getDramaMovies: http.createRoute<void, Data<MovieEntity>>({
    url: '/v1.3/movie',
    params: {
      year: getCurrentYear(),
      'genres.name': GenresEnum.Drama,
      'poster.previewUrl': '!null',
      name: '!null',
      sortField: 'votes.kp',
      sortType: '-1',
      limit: LIMIT,
    },
  }),
  getFantasticMovies: http.createRoute<void, Data<MovieEntity>>({
    url: '/v1.3/movie',
    params: {
      'genres.name': GenresEnum.ScienceFiction,
      'poster.previewUrl': '!null',
      year: getCurrentYear(),
      name: '!null',
      sortField: 'votes.kp',
      sortType: '-1',
      limit: LIMIT,
    },
  }),
  searchByName: http.createRoute<SearchParams, Data<SearchMovieEntity>>(({ query, page }) => ({
    url: '/v1.2/movie/search',
    params: {
      query,
      page,
      limit: 30,
    },
  })),
  getAllFavorites: http.createRoute<string, Data<MovieEntity>>((id) => ({
    url: `/v1.3/movie?${id}&limit=250`,
  })),
});

export const commonApi = routesConfig.build();
