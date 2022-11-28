import type { IMovieItem } from "entities/movie-item";
import { LIMIT } from "shared/config";
import { axios } from "shared/lib/axios";
import { getCurrentYear } from "shared/lib/get-current-year";
import type { IData } from "shared/types/IData";

export const getNewFilms = async () => {
  try {
    const { data } = await axios.get<IData<IMovieItem[]>>("/movie", {
      params: {
        search: getCurrentYear(),
        field: "year",
        sortField: "votes.filmCritics",
        sortType: "-1",
        limit: LIMIT,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};
