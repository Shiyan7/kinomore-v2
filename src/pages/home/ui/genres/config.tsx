import { GenresEnum } from 'shared/config';
import { paths } from 'shared/routing';
import { Icon } from 'shared/ui/icon';

export const genres = [
  { href: paths.movies, icon: <Icon name="genres/cup" />, text: 'Лучшие' },
  { href: paths.catalog({ year: '2022-2023' }), icon: <Icon name="genres/fire" />, text: 'Новые' },
  {
    href: paths.catalog({ genre: GenresEnum.Romance }),
    icon: <Icon name="genres/hearts" />,
    text: 'Мелодраммы',
  },
  { href: paths.catalog({ genre: GenresEnum.Horror }), icon: <Icon name="genres/knife" />, text: 'Ужасы' },
  {
    href: paths.catalog({ genre: GenresEnum.Adventure }),
    icon: <Icon name="genres/map" />,
    text: 'Приключения',
  },
  {
    href: paths.catalog({ genre: GenresEnum.ScienceFiction }),
    icon: <Icon name="genres/rocket" />,
    text: 'Фантастика',
  },
  { href: paths.catalog({ genre: GenresEnum.Family }), icon: <Icon name="genres/people" />, text: 'Семейные' },
  { href: paths.catalog({ genre: GenresEnum.Comedy }), icon: <Icon name="genres/happy" />, text: 'Комедии' },
  { href: paths.catalog({ genre: GenresEnum.Concert }), icon: <Icon name="genres/music" />, text: 'Концерты' },
  { href: paths.catalog({ genre: GenresEnum.War }), icon: <Icon name="genres/tank" />, text: 'Военные' },
];
