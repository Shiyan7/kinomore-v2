import { createQuery } from '@farfetched/core';
import { createCommonRequestFx } from 'shared/api/requests';
import type { CatalogParams, Movies } from 'shared/api/types';

export const catalogQuery = createQuery({
  effect: createCommonRequestFx<CatalogParams, Movies>(
    ({ genre, rating, sort, ...rest }) => ({
      url: '/v1.4/movie',
      params: {
        limit: 90,
        selectFields: ['id', 'name', 'year', 'movieLength', 'rating'],
        ...(sort && { sortField: [sort, 'votes.kp'], sortType: ['-1', '-1'] }),
        'genres.name': genre,
        'rating.kp': rating,
        'poster.previewUrl': '!null',
        ...rest,
      },
    })
  ),
});
