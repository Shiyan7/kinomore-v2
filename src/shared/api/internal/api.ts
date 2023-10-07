import { http } from './config';
import type { AuthDto, FavoriteItems, Message, Status, User } from './types';

const routesConfig = http.createRoutesConfig({
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
  checkUser: http.createRoute<{ email: string }, Status>((data) => ({
    url: '/auth/check-email',
    data,
  })),
  getMe: http.createRoute<void, User>({
    url: '/user/me',
  }),
  getFavoritesId: http.createRoute<void, FavoriteItems>({
    url: '/favorites',
  }),
  toggleFavorite: http.createRoute<{ id: string }, Message>((data) => ({
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
