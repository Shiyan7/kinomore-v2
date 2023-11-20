import { createQuery } from '@farfetched/core';
import { createCommonRequestFx } from 'shared/api/requests';
import type { CatalogParams, Movies } from 'shared/api/types';
import { getYears } from 'shared/lib';

export const catalogQuery = createQuery({
  effect: createCommonRequestFx<CatalogParams, Movies>(
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
    })
  ),
});
