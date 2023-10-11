import type { Name } from 'shared/api';

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getGenre(genres: Name[]): string {
  const genre = genres[genres.length - 1]?.name;

  return capitalizeFirstLetter(genre ?? '');
}
