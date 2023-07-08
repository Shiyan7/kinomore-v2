import type { Rating } from 'shared/api';

export const getRating = (rating: Rating | null | undefined) => (rating?.kp ?? rating?.imdb ?? 0)?.toFixed(1);
