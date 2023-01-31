import type { MovieRating } from 'shared/api';

export const getRating = (rating: Partial<MovieRating> | undefined) => {
  return (rating?.kp ?? rating?.imdb ?? 0)?.toFixed(1);
};
