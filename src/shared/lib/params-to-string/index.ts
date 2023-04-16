export function paramsToString(params: string[]) {
  return params
    .map((value) => value)
    .filter(Boolean)
    .join(', ');
}
