export function getCountry(countries: { name: string }[]): string | null {
  if (!countries) return null;

  return countries[countries.length - 1]?.name;
}
