import { http } from './config';
import type { AuthDto, FavoriteItems, Message, Status, TokensDto, User } from './types';

const routesConfig = http.createRoutesConfig({
  signUpFx: http.createRoute<AuthDto, TokensDto>((data) => ({
    url: '/auth/sign-up',
    method: 'post',
    data,
  })),
  signInFx: http.createRoute<AuthDto, TokensDto>((data) => ({
    url: '/auth/sign-in',
    method: 'post',
    data,
  })),
  googleLoginFx: http.createRoute<string, TokensDto>((code) => ({
    url: '/auth/google',
    method: 'post',
    data: {
      code,
    },
  })),
  refreshFx: http.createRoute<string, TokensDto>((token) => ({
    url: '/auth/refresh',
    method: 'post',
    data: {
      token,
    },
  })),
  checkUserFx: http.createRoute<string, Status>((email) => ({
    url: '/auth/check-user',
    data: {
      email,
    },
  })),
  getMeFx: http.createRoute<void, User>({
    url: '/user/me',
  }),
  getFavoritesIdFx: http.createRoute<void, FavoriteItems>({
    url: '/favorites',
  }),
  toggleFavoriteFx: http.createRoute<{ id: number }, Message>((data) => ({
    url: '/favorites',
    method: 'post',
    data,
  })),
  checkFavoriteFx: http.createRoute<string, boolean>((id) => ({
    url: '/favorites/check',
    data: {
      id,
    },
  })),
});

export const {
  signUpFx,
  signInFx,
  googleLoginFx,
  refreshFx,
  checkUserFx,
  getMeFx,
  getFavoritesIdFx,
  toggleFavoriteFx,
  checkFavoriteFx,
} = routesConfig.build();
