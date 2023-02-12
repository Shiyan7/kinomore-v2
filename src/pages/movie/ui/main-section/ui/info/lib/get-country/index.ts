export function getCountry(countries: Array<{ name: string }> | null): string | null {
  if (!countries) return null;

  return countries[countries.length - 1]?.name;
}
