import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

export function timestampToDate(date: string | number | Date | undefined, format: string) {
  return dayjs(date).format(format);
}
