import type { Name } from 'shared/api/types';

export function getCountry(countries: Name[]): string {
  return countries[countries.length - 1]?.name ?? '';
}
