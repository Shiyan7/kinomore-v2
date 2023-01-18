import { http } from './base';
import type { HeroMovie } from './types';

const routesConfig = http.createRoutesConfig({
  getHeroMovies: http.createRoute<void, HeroMovie[]>(() => ({
    url: '/hero',
    method: 'get',
  })),
  check: http.createRoute<string, { status: boolean }>((email) => ({
    url: '/check',
    method: 'get',
    params: {
      email,
    },
  })),
});

export const internalApi = routesConfig.build();
