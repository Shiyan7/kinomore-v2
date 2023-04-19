import { http } from './config';
import type { HeroMovie, AuthDto, Message, User } from './types';

const routesConfig = http.createRoutesConfig({
  getHeroMovies: http.createRoute<void, HeroMovie[]>({
    url: '/movies',
  }),
  signUp: http.createRoute<AuthDto, Message>((data) => ({
    url: '/auth/sign-up',
    method: 'post',
    data,
  })),
  signIn: http.createRoute<AuthDto, Message>((data) => ({
    url: '/auth/sign-in',
    method: 'post',
    data,
  })),
  refresh: http.createRoute<void, Message>({
    url: '/auth/refresh',
    method: 'post',
  }),
  logOut: http.createRoute<void, Message>({
    url: '/auth/logout',
    method: 'post',
  }),
  checkUser: http.createRoute<string, { status: boolean }>((email) => ({
    url: '/auth/check-email',
    params: {
      email,
    },
  })),
  getProfile: http.createRoute<void, User>({
    url: '/user/profile',
  }),
});

export const internalApi = routesConfig.build();
