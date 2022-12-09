import type { IMovieItem } from "entities/movie-item";
import { LIMIT } from "shared/config";
import { getCurrentYear } from "shared/lib";
import type { Data } from "../types";
import { http } from "./base";

const routesConfig = http.createRoutesConfig({
  getNew: http.createRoute<number | void, Data<IMovieItem[]>>((limit = LIMIT) => ({
    url: "/movie",
    params: {
      search: getCurrentYear(),
      field: "year",
      sortField: "votes.filmCritics",
      sortType: "-1",
      limit,
    },
  })),
  getComedy: http.createRoute<number | void, Data<IMovieItem[]>>((limit = LIMIT) => ({
    url: "/movie?search[]=7-10&field[]=rating.kp&search=!null&field=name&search=1&field=typeNumber&search=!null&field=votes.kp&sortField=year&sortType=-1",
    params: {
      search: getCurrentYear(),
      field: "year",
      "search[]": "комедия",
      "field[]": "genres.name",
      limit,
    },
  })),
  forFamily: http.createRoute<number | void, Data<IMovieItem[]>>((limit = LIMIT) => ({
    url: "/movie?search[]=1-9&field[]=rating.kp&search=!null&field=name&search=1&field=typeNumber&search=!null&field=votes.kp&sortField=year&sortType=-1",
    params: {
      search: `1960-${getCurrentYear()}`,
      field: "year",
      "search[]": "семейный",
      "field[]": "genres.name",
      limit,
    },
  })),
});

const moviesApi = routesConfig.build();

export { moviesApi };
