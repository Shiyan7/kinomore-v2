import { createQuery } from '@farfetched/core';
import type { Movies } from 'shared/api/types';
import {
  createCommonRequestFx,
  createInternalRequestFx,
} from 'shared/api/requests';
import type { FavoriteItems } from './types';

export const favoritesQuery = createQuery({
  effect: createInternalRequestFx<void, FavoriteItems>({
    url: '/favorites',
  }),
});

export const moviesQuery = createQuery({
  effect: createCommonRequestFx<string, Movies>((params) => ({
    url: `/v1.3/movie?${params}`,
    params: {
      limit: 250,
    },
  })),
  mapData({ result }) {
    return result.docs;
  },
});
