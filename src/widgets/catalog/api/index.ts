import { cache, createQuery } from '@farfetched/core';
import { createCommonRequestFx } from 'shared/api/requests';
import type { CatalogParams, Movies } from 'shared/api/types';
import { RANGE_YEARS } from 'shared/config';

export const catalogQuery = createQuery({
  effect: createCommonRequestFx<CatalogParams, Movies>(
    ({ genre, rating, sort, year, ...rest }) => ({
      url: '/v1.4/movie',
      params: {
        limit: 90,
        notNullFields: ['poster.url'],
        selectFields: ['id', 'name', 'year', 'movieLength', 'rating'],
        year: year || RANGE_YEARS,
        ...(sort && { sortField: [sort, 'votes.kp'], sortType: ['-1', '-1'] }),
        ...(genre && { 'genres.name': genre }),
        ...(rating && { 'rating.kp': rating }),
        ...rest,
      },
    })
  ),
});

cache(catalogQuery);
