import { http } from "./base";
import { IHeroMovie } from "./types";

const routesConfig = http.createRoutesConfig({
  getHeroMovies: http.createRoute<void, IHeroMovie[]>(() => ({
    url: "/hero",
  })),
});

const internalApi = routesConfig.build();

export { internalApi };
