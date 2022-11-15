import axios from "axios";
import type { ISlide } from "./slide";

export const getHeroMovies = async () => {
  const { data } = await axios.get<ISlide[]>("http://localhost:3000/api/hero");

  return data;
};
