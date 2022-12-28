import type { MovieRating } from "shared/api";

export const getRating = (rating: MovieRating | undefined) => {
  return (rating?.kp ? rating?.kp : rating?.imdb)?.toFixed(1);
};
