export function getPersonInfo(params: Array<unknown>): string {
  return params
    .filter((value) => !!value)
    .map((value) => value)
    .join(', ');
}
