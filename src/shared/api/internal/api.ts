// @ts-nocheck
import { http } from './base';
import type { HeroMovie, UserDto, UserWithTokensDto } from './types';

const routesConfig = http.createRoutesConfig({
  getHeroMovies: http.createRoute<void, HeroMovie[]>({
    url: '/hero',
  }),
  register: http.createRoute<UserDto, UserWithTokensDto>((data) => ({
    url: '/register',
    method: 'post',
    data,
  })),
  login: http.createRoute<UserDto, UserWithTokensDto>((data) => ({
    url: '/login',
    method: 'post',
    data,
  })),
  refresh: http.createRoute<void, UserWithTokensDto>({
    url: '/refresh',
  }),
  logout: http.createRoute<void, UserWithTokensDto>({
    url: '/logout',
    method: 'post',
  }),
  checkUser: http.createRoute<string, { status: boolean }>((email) => ({
    url: '/check',
    params: {
      email,
    },
  })),
});

export const internalApi = routesConfig.build();
