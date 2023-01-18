import { http } from './base';
import type { HeroMovie } from './types';

const routesConfig = http.createRoutesConfig({
  getHeroMovies: http.createRoute<void, HeroMovie[]>({
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
    url: '/hero',
  }),
  check: http.createRoute<string, { status: boolean }>((email) => ({
    url: '/check',
    params: {
      email,
    },
  })),
});

export const internalApi = routesConfig.build();
