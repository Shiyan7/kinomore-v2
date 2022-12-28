export const minutesToHour = (length: number) => {
  const num = length;
  const hours = num / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);

  return `${rhours} ч ${rminutes} мин`;
};
