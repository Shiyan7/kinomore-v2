import { http } from './config';
import type { HeroMovie, AuthDto, Tokens, User } from './types';

const routesConfig = http.createRoutesConfig({
  getHeroMovies: http.createRoute<void, HeroMovie[]>({
    url: '/movies',
  }),
  register: http.createRoute<AuthDto, Tokens>((data) => ({
    url: '/auth/sign-up',
    method: 'post',
    data,
  })),
  login: http.createRoute<AuthDto, Tokens>((data) => ({
    url: '/auth/sign-in',
    method: 'post',
    data,
  })),
  refresh: http.createRoute<void, Tokens>({
    url: '/auth/refresh',
    method: 'post',
  }),
  logout: http.createRoute<void, { message: string }>({
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
