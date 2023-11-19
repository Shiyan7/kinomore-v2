import { createQuery } from '@farfetched/core';
import { createCommonRequestFx } from 'shared/api/requests';
import { SearchMovies, SearchParams } from 'shared/api/types';

export const searchByNameQuery = createQuery({
  effect: createCommonRequestFx<SearchParams, SearchMovies>(({ query, page }) => ({
    url: '/v1.2/movie/search',
    params: {
      query,
      page,
      limit: 30,
    },
  })),
});
