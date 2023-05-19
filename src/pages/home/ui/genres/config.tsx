import { Icon } from 'shared/ui/icon';
import { GenresEnum } from 'shared/config';
import { paths } from 'shared/routing';

export const genres = [
  { href: paths.movies, icon: <Icon type="hero" name="cup" />, text: 'Лучшие' },
  { href: paths.catalog({ year: '2022-2023' }), icon: <Icon type="hero" name="fire" />, text: 'Новые' },
  {
    href: paths.catalog({ genre: GenresEnum.Romance }),
    icon: <Icon type="hero" name="hearts" />,
    text: 'Мелодраммы',
  },
  { href: paths.catalog({ genre: GenresEnum.Horror }), icon: <Icon type="hero" name="knife" />, text: 'Ужасы' },
  {
    href: paths.catalog({ genre: GenresEnum.Adventure }),
    icon: <Icon type="hero" name="map" />,
    text: 'Приключения',
  },
  {
    href: paths.catalog({ genre: GenresEnum.ScienceFiction }),
    icon: <Icon type="hero" name="rocket" />,
    text: 'Фантастика',
  },
  { href: paths.catalog({ genre: GenresEnum.Family }), icon: <Icon type="hero" name="people" />, text: 'Семейные' },
  { href: paths.catalog({ genre: GenresEnum.Comedy }), icon: <Icon type="hero" name="happy" />, text: 'Комедии' },
  { href: paths.catalog({ genre: GenresEnum.Concert }), icon: <Icon type="hero" name="music" />, text: 'Концерты' },
  { href: paths.catalog({ genre: GenresEnum.War }), icon: <Icon type="hero" name="tank" />, text: 'Военные' },
];
