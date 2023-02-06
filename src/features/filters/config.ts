import type { SelectOption } from 'shared/ui/select';

export const genres: SelectOption[] = [
  { value: '', label: 'Все' },
  { value: 'боевик', label: 'Боевик' },
  { value: 'биография', label: 'Биография' },
  { value: 'вестерн', label: 'Вестерн' },
  { value: 'военный', label: 'Военный' },
  { value: 'детектив', label: 'Детектив' },
  { value: 'детский', label: 'Детский' },
  { value: 'для взрослых', label: 'Для взрослых' },
  { value: 'документальный', label: 'Документальный' },
  { value: 'драма', label: 'Драма' },
  { value: 'фильм-нуар', label: 'Фильм-нуар' },
  { value: 'фантастика', label: 'Фантастика' },
  { value: 'фэнтези', label: 'Фэнтези' },
  { value: 'игра', label: 'Игра' },
  { value: 'история', label: 'История' },
  { value: 'комедия', label: 'Комедия' },
  { value: 'концерт', label: 'Концерт' },
  { value: 'короткометражка', label: 'Короткометражка' },
  { value: 'криминал', label: 'Криминал' },
  { value: 'мелодрама', label: 'Мелодрама' },
  { value: 'музыка', label: 'Музыка' },
  { value: 'мюзикл', label: 'Мюзикл' },
  { value: 'приключения', label: 'Приключения' },
  { value: 'семейный', label: 'Семейный' },
  { value: 'спорт', label: 'Спорт' },
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
  { value: '2010-2019', label: '2010-2019' },
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
