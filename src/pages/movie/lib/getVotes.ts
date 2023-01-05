import type { MovieRating } from "shared/api";

export const getVotes = (votes: MovieRating | undefined) => {
  return Number(votes?.kp || votes?.imdb);
};
