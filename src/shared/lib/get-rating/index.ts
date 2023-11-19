import type { Rating } from 'shared/api/types';

export const getRating = (rating: Rating | null | undefined) => (rating?.kp ?? rating?.imdb ?? 0)?.toFixed(1);
