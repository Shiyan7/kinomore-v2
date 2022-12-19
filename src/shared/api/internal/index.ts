import { http } from "./base";
import { IHeroMovie } from "./types";

const routesConfig = http.createRoutesConfig({
  getHeroMovies: http.createRoute<void, IHeroMovie[]>(() => ({
    url: "/hero",
  })),
  check: http.createRoute<string, { status: boolean }>((email) => ({
    url: "/check",
    params: {
      email,
    },
  })),
});

const internalApi = routesConfig.build();

export { internalApi };
