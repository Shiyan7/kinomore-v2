export function arrayToSearchParams(array: unknown[]) {
  return array.map((item) => `id=${item}`).join('&');
}
