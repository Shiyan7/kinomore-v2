import type { IMovieItem } from "entities/movie-item";
import { LIMIT } from "shared/config";
import { getCurrentYear } from "shared/lib";
import type { Data } from "../types";
import { http } from "./base";

const routesConfig = http.createRoutesConfig({
  getNew: http.createRoute<void, Data<IMovieItem[]>>({
    url: "/movie",
    params: {
      search: getCurrentYear(),
      field: "year",
      sortField: "votes.filmCritics",
      sortType: "-1",
      limit: LIMIT,
    },
  }),
  getComedy: http.createRoute<void, Data<IMovieItem[]>>({
    url: "/movie?search[]=7-10&field[]=rating.kp&search=!null&field=name&search=1&field=typeNumber&search=!null&field=votes.kp&sortField=year&sortType=-1",
    params: {
      search: getCurrentYear(),
      field: "year",
      "search[]": "комедия",
      "field[]": "genres.name",
      limit: LIMIT,
    },
  }),
});

const moviesApi = routesConfig.build();

export { moviesApi };
