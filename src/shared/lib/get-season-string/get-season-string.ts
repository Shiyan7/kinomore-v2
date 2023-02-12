export function getSeasonString(length: number | null): string | null {
  if (!length) return null;

  const formatter = new Intl.PluralRules('ru');
  const pluralCategory = formatter.select(length);

  switch (pluralCategory) {
    case 'one':
      return '1 сезон';
    case 'few':
      return `${length} сезона`;
    default:
      return `${length} сезонов`;
  }
}
