import { createQuery } from '@farfetched/core';
import { createCommonRequestFx } from 'shared/api/requests';
import { Person } from 'shared/api/types';

export const personByIdQuery = createQuery({
  effect: createCommonRequestFx<string, Person>((id) => ({
    url: `/v1/person/${id}`,
  })),
});
