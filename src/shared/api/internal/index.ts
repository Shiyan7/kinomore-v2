// @ts-nocheck
import { http } from './base';
import type { HeroMovie, UserDto, ResponseUser } from './types';

const routesConfig = http.createRoutesConfig({
  getHeroMovies: http.createRoute<void, HeroMovie[]>({
    url: '/hero',
    headers: null,
  }),
  googleLogin: http.createRoute<string, ResponseUser>((token) => ({
    url: '/google',
    method: 'post',
    headers: null,
    data: {
      token,
    },
  })),
  register: http.createRoute<UserDto, ResponseUser>(({ ...data }) => ({
    url: '/register',
    method: 'post',
    headers: null,
    data: {
      ...data,
    },
  })),
  login: http.createRoute<UserDto, ResponseUser>(({ ...data }) => ({
    url: '/login',
    method: 'post',
    headers: null,
    data: {
      ...data,
    },
  })),
  checkUser: http.createRoute<string, { status: boolean }>((email) => ({
    url: '/check',
    headers: null,
    params: {
      email,
    },
  })),
});

export const internalApi = routesConfig.build();
