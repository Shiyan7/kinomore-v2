export function timestampToDate(date: Date | undefined) {
  if (!date) return '—';

  const dateObject = new Date(date);
  return dateObject.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
