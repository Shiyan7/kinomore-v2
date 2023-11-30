export function paramsToString(params: string[]) {
  return params
    .filter(Boolean)
    .map((value) => value[0].toUpperCase() + value.slice(1))
    .join(', ');
}
