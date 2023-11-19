import { createQuery } from '@farfetched/core';
import { createCommonRequestFx } from 'shared/api/requests';
import { Movie } from 'shared/api/types';

export const movieByIdQuery = createQuery({
  effect: createCommonRequestFx<string, Movie>((id) => ({
    url: `/v1.3/movie/${id}`,
  })),
});
