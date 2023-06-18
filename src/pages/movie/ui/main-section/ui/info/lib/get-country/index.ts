import type { Name } from 'shared/api';

export function getCountry(countries: Name[]): string {
  return countries[countries.length - 1]?.name ?? '';
}
