import { createQuery } from '@farfetched/core';
import { createInternalRequestFx } from 'shared/api/requests';
import type { AuthDto, TokensDto, Session } from './types';

export const signUpQuery = createQuery({
  effect: createInternalRequestFx<AuthDto, TokensDto>((body) => ({
    url: '/auth/sign-up',
    method: 'post',
    body,
  })),
});

export const signInQuery = createQuery({
  effect: createInternalRequestFx<AuthDto, TokensDto>((body) => ({
    url: '/auth/sign-in',
    method: 'post',
    body,
  })),
});

export const googleLoginQuery = createQuery({
  effect: createInternalRequestFx<string, TokensDto>((code) => ({
    url: '/auth/google',
    method: 'post',
    body: {
      code,
    },
  })),
});

export const refreshQuery = createQuery({
  effect: createInternalRequestFx<string, TokensDto>((token) => ({
    url: '/auth/refresh',
    method: 'post',
    body: {
      token,
    },
  })),
});

export const sessionQuery = createQuery({
  effect: createInternalRequestFx<void, Session>({
    url: '/user/me',
  }),
});
