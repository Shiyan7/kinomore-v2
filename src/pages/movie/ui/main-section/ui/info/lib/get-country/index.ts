export function getCountry(countries: Array<{ name: string }>): string {
  return countries[countries.length - 1].name;
}
