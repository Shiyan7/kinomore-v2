export const minutesToHour = (length = 0) => {
  const num = Math.abs(length);
  const hours = num / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);

  return `${rhours} ч ${rminutes} мин`;
};
