import { createQuery, createMutation } from '@farfetched/core';
import { createInternalRequestFx } from 'shared/api/requests';
import type { AuthDto, TokensDto, Session } from './types';

export const signUpQuery = createMutation({
  effect: createInternalRequestFx<AuthDto, TokensDto>((body) => ({
    url: '/auth/sign-up',
    method: 'post',
    body,
  })),
});

export const signInQuery = createMutation({
  effect: createInternalRequestFx<AuthDto, TokensDto>((body) => ({
    url: '/auth/sign-in',
    method: 'post',
    body,
  })),
});

export const googleLoginQuery = createMutation({
  effect: createInternalRequestFx<string, TokensDto>((code) => ({
    url: '/auth/google',
    method: 'post',
    body: {
      code,
    },
  })),
});

export const refreshQuery = createMutation({
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
