import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

export function timestampToDate(date: string | number | Date | undefined, format = 'DD/MM/YYYY') {
  if (!date) return '—';

  return dayjs(date).format(format);
}
