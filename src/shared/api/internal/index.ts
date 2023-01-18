import { http } from './base';

const routesConfig = http.createRoutesConfig({
  check: http.createRoute<string, { status: boolean }>((email) => ({
    url: '/check',
    params: {
      email,
    },
  })),
});

export const internalApi = routesConfig.build();
