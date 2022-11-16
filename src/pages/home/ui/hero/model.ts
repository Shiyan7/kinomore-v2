import axios from "axios";
import type { ISlide } from "./slide";

export const getHeroMovies = async () => {
  const { data } = await axios.get<ISlide[]>(`${process.env.HOST}/api/hero`);

  return data;
};
