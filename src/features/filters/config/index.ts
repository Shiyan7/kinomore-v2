import { GenresEnum, SortEnum } from 'shared/config';
import type { SelectOption } from '../types';

export const genres: SelectOption[] = [
  { value: '', label: 'Все' },
  { value: GenresEnum.Adventure, label: 'Приключения' },
  { value: GenresEnum.Thriller, label: 'Триллеры' },
  { value: GenresEnum.ScienceFiction, label: 'Фантастика' },
  { value: GenresEnum.Action, label: 'Боевики' },
  { value: GenresEnum.Comedy, label: 'Комедии' },
  { value: GenresEnum.Romance, label: 'Мелодрамы' },
  { value: GenresEnum.Drama, label: 'Драмы' },
  { value: GenresEnum.Family, label: 'Семейное' },
  { value: GenresEnum.Crime, label: 'Криминальное' },
  { value: GenresEnum.Sports, label: 'Спорт' },
  { value: GenresEnum.War, label: 'Военное' },
  { value: GenresEnum.Biography, label: 'Биографии' },
  { value: GenresEnum.Fantasy, label: 'Фэнтези' },
  { value: GenresEnum.Horror, label: 'Ужасы' },
  { value: GenresEnum.History, label: 'Историческое' },
  { value: GenresEnum.Music, label: 'Музыкальное' },
  { value: GenresEnum.Documentary, label: 'Документальное' },
  { value: GenresEnum.Kids, label: 'Детские' },
  { value: GenresEnum.Detective, label: 'Детективы' },
  { value: GenresEnum.Western, label: 'Вестерны' },
  { value: GenresEnum.Adult, label: 'Для взрослых' },
  { value: GenresEnum.FilmNoir, label: 'Фильм-нуар' },
  { value: GenresEnum.Concert, label: 'Концерт' },
  { value: GenresEnum.Short, label: 'Короткометражка' },
];

export const sort: SelectOption[] = [
  { value: '', label: 'Рекомендуемые' },
  { value: SortEnum.Rating, label: 'По рейтингу' },
  { value: SortEnum.Year, label: 'По дате выхода' },
];

export const ratings: SelectOption[] = [
  { value: '', label: 'Любой рейтинг' },
  { value: '9-10', label: 'Больше 9' },
  { value: '8-10', label: 'Больше 8' },
  { value: '7-10', label: 'Больше 7' },
  { value: '6-10', label: 'Больше 6' },
  { value: '5-10', label: 'Больше 5' },
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

export const filters = [
  { label: 'Жанры', queryName: 'genre', options: genres },
  { label: 'Рейтинг', queryName: 'rating', options: ratings },
  { label: 'Годы выхода', queryName: 'year', options: years },
];
