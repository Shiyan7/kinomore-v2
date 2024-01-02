import { createQuery, createMutation } from '@farfetched/core';
import { createInternalRequestFx } from 'shared/api/requests';
import type { Message, Status } from './types';

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
