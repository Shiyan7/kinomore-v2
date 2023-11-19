import { createQuery } from '@farfetched/core';
import { createCommonRequestFx, createInternalRequestFx } from 'shared/api/requests';
import { Movies } from 'shared/api/types';
import { FavoriteItems, Message, Status } from './types';

export const favoritesIdQuery = createQuery({
  effect: createInternalRequestFx<void, FavoriteItems>({
    url: '/favorites',
  }),
});

export const toggleFavoriteQuery = createQuery({
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

export const allFavoritesQuery = createQuery({
  effect: createCommonRequestFx<string, Movies>((id) => ({
    url: `/v1.3/movie?${id}`,
    params: {
      limit: 250,
    },
  })),
});
