import { http } from './config';
import type { AuthDto, FavoriteItems, Message, Status, TokensDto, User } from './types';

const routesConfig = http.createRoutesConfig({
  signUp: http.createRoute<AuthDto, TokensDto>((data) => ({
    url: '/auth/sign-up',
    method: 'post',
    data,
  })),
  signIn: http.createRoute<AuthDto, TokensDto>((data) => ({
    url: '/auth/sign-in',
    method: 'post',
    data,
  })),
  refresh: http.createRoute<string, TokensDto>((token) => ({
    url: '/auth/refresh',
    method: 'post',
    data: {
      token,
    },
  })),
  checkUser: http.createRoute<string, Status>((email) => ({
    url: '/auth/check-user',
    data: {
      email,
    },
  })),
  getMe: http.createRoute<void, User>({
    url: '/user/me',
  }),
  getFavoritesId: http.createRoute<void, FavoriteItems>({
    url: '/favorites',
  }),
  toggleFavorite: http.createRoute<{ id: number }, Message>((data) => ({
    url: '/favorites',
    method: 'post',
    data,
  })),
  checkFavorite: http.createRoute<string, boolean>((id) => ({
    url: '/favorites/check',
    data: {
      id,
    },
  })),
});

export const internalApi = routesConfig.build();
