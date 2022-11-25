import type { IMovieItem } from "entities/movie-item";
import { axios } from "shared/lib/axios";
import { getCurrentYear } from "shared/lib/get-current-year";
import type { IData } from "shared/types/IData";

export const getComedyFilms = async () => {
  const { data } = await axios.get<IData<IMovieItem[]>>(
    "/movie?search[]=7-10&field[]=rating.kp&search=!null&field=name&search=1&field=typeNumber&search=!null&field=votes.kp&sortField=year&sortType=-1",
    {
      params: {
        search: getCurrentYear(),
        field: "year",
        "search[]": "комедия",
        "field[]": "genres.name",
        limit: 15,
      },
    }
  );

  return data;
};
