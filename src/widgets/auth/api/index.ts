import { createQuery } from '@farfetched/core';
import { createInternalRequestFx } from 'shared/api/requests';

export const checkUserQuery = createQuery({
  effect: createInternalRequestFx<string, { isNewUser: boolean }>((email) => ({
    url: '/auth/check-user',
    params: {
      email,
    },
  })),
});
