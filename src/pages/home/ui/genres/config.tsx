import { GenresEnum } from 'shared/config';
import { paths } from 'shared/routing';
import { Icon } from 'shared/ui/icon';

export const genres = [
  { href: paths.movies, icon: <Icon type="genres" name="cup" />, text: 'Лучшие' },
  { href: paths.catalog({ year: '2022-2023' }), icon: <Icon type="genres" name="fire" />, text: 'Новые' },
  {
    href: paths.catalog({ genre: GenresEnum.Romance }),
    icon: <Icon type="genres" name="hearts" />,
    text: 'Мелодраммы',
  },
  { href: paths.catalog({ genre: GenresEnum.Horror }), icon: <Icon type="genres" name="knife" />, text: 'Ужасы' },
  {
    href: paths.catalog({ genre: GenresEnum.Adventure }),
    icon: <Icon type="genres" name="map" />,
    text: 'Приключения',
  },
  {
    href: paths.catalog({ genre: GenresEnum.ScienceFiction }),
    icon: <Icon type="genres" name="rocket" />,
    text: 'Фантастика',
  },
  { href: paths.catalog({ genre: GenresEnum.Family }), icon: <Icon type="genres" name="people" />, text: 'Семейные' },
  { href: paths.catalog({ genre: GenresEnum.Comedy }), icon: <Icon type="genres" name="happy" />, text: 'Комедии' },
  { href: paths.catalog({ genre: GenresEnum.Concert }), icon: <Icon type="genres" name="music" />, text: 'Концерты' },
  { href: paths.catalog({ genre: GenresEnum.War }), icon: <Icon type="genres" name="tank" />, text: 'Военные' },
];
