import { createQuery, createMutation } from '@farfetched/core';
import {
  createCommonRequestFx,
  createInternalRequestFx,
} from 'shared/api/requests';
import type { Movies } from 'shared/api/types';
import type { FavoriteItems, Message, Status } from './types';

export const favoritesQuery = createQuery({
  effect: createInternalRequestFx<void, FavoriteItems>({
    url: '/favorites',
  }),
});

export const toggleFavoriteQuery = createMutation({
  effect: createInternalRequestFx<{ id: number }, Message>((body) => ({
    url: '/favorites',
    method: 'post',
    body,
  })),
});

export const checkFavoriteQuery = createQuery({
  effect: createInternalRequestFx<string, Status>((id) => ({
    url: '/favorites/check',
    params: {
      id,
    },
  })),
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
