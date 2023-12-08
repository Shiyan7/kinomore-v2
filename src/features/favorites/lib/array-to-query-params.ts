export function arrayToQueryParams(array: unknown[]) {
  return array.map((item) => `id=${item}`).join('&');
}
