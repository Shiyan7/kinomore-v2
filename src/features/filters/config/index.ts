import type { SelectOption } from '../types';

export const genres: SelectOption[] = [
  { value: '', label: 'Все' },
  { value: 'приключения', label: 'Приключения' },
  { value: 'триллер', label: 'Триллеры' },
  { value: 'фантастика', label: 'Фантастика' },
  { value: 'боевик', label: 'Боевики' },
  { value: 'комедия', label: 'Комедии' },
  { value: 'мелодрама', label: 'Мелодрамы' },
  { value: 'драма', label: 'Драмы' },
  { value: 'семейный', label: 'Семейное' },
  { value: 'криминал', label: 'Криминальное' },
  { value: 'спорт', label: 'Спорт' },
  { value: 'военный', label: 'Военное' },
  { value: 'биография', label: 'Биографии' },
  { value: 'фэнтези', label: 'Фэнтези' },
  { value: 'ужасы', label: 'Ужасы' },
  { value: 'история', label: 'Историческое' },
  { value: 'музыка', label: 'Музыкальное' },
  { value: 'документальный', label: 'Документальное' },
  { value: 'детский', label: 'Детские' },
  { value: 'детектив', label: 'Детективы' },
  { value: 'вестерн', label: 'Вестерны' },
  { value: 'для взрослых', label: 'Для взрослых' },
  { value: 'фильм-нуар', label: 'Фильм-нуар' },
  { value: 'концерт', label: 'Концерт' },
  { value: 'короткометражка', label: 'Короткометражка' },
  { value: 'мюзикл', label: 'Мюзикл' },
];

export const ratings: SelectOption[] = [
  { value: '', label: 'Любой рейтинг' },
  { value: '9', label: 'Больше 9' },
  { value: '8', label: 'Больше 8' },
  { value: '7', label: 'Больше 7' },
  { value: '6', label: 'Больше 6' },
  { value: '5', label: 'Больше 5' },
];

export const years: SelectOption[] = [
  { value: '', label: 'Все годы' },
  { value: '2022-2023', label: '2022-2023' },
  { value: '2020-2021', label: '2020-2021' },
  { value: '2014-2019', label: '2014-2019' },
  { value: '2010-2014', label: '2010-2014' },
  { value: '2000-2009', label: '2000-2009' },
  { value: '1990-1999', label: '1990-1999' },
  { value: '1980-1989', label: '1980-1989' },
  { value: '1970-1979', label: '1970-1979' },
  { value: '1960-1969', label: '1960-1969' },
  { value: '0-1959', label: 'до 1959' },
];

export const filters: SelectOption[] = [
  { value: '', label: 'Рекомендуемые' },
  { value: 'rating.kp', label: 'По рейтингу' },
  { value: 'year', label: 'По дате выхода' },
];
