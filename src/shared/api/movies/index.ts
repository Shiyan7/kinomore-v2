import type { IMovieItem } from "entities/movie-item";
import { GenresEnum, LIMIT } from "shared/config";
import { getCurrentYear } from "shared/lib";
import type { Data } from "./types";
import { http } from "./base";

const DEFAULT_PARAMS =
  "&field[]=rating.kp&search=!null&field=name&search=!null&field=votes.kp&sortField=year&sortType=-1";

const routesConfig = http.createRoutesConfig({
  getNew: http.createRoute<number | void, Data<IMovieItem>>((limit = LIMIT) => ({
    url: "/movie",
    params: {
      "search[]": "5-9",
      "field[]": "rating.kp",
      search: getCurrentYear(),
      field: "year",
      sortField: "votes.filmCritics",
      sortType: "-1",
      limit,
    },
  })),
  getComedy: http.createRoute<number | void, Data<IMovieItem>>((limit = LIMIT) => ({
    url: `/movie?search[]=7-10${DEFAULT_PARAMS}&search=1&field=typeNumber`,
    params: {
      search: getCurrentYear(),
      field: "year",
      "search[]": GenresEnum.Komediya,
      "field[]": "genres.name",
      limit,
    },
  })),
  forFamily: http.createRoute<number | void, Data<IMovieItem>>((limit = LIMIT) => ({
    url: `/movie?search[]=1-10${DEFAULT_PARAMS}`,
    params: {
      search: `1960-${getCurrentYear()}`,
      field: "year",
      "search[]": GenresEnum.Semejnyj,
      "field[]": "genres.name",
      limit,
    },
  })),
  searchByName: http.createRoute<string, Data<IMovieItem>>((query) => ({
    url: "/movie",
    params: {
      search: query,
      field: "id",
      limit: 20,
    },
  })),
});

const moviesApi = routesConfig.build();

export { moviesApi };
