export function paramsToString(params: string[]) {
  return params
    .map((value) => value)
    .filter((value) => !!value)
    .join(', ');
}
