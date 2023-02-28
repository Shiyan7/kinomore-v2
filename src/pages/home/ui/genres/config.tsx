import {
  MapIcon,
  HeartsIcon,
  PeopleIcon,
  HappyIcon,
  FireIcon,
  CupIcon,
  MusicIcon,
  KnifeIcon,
  RocketIcon,
  TankIcon,
} from 'shared/ui/icons';
import { GenresEnum } from 'shared/config';
import { paths } from 'shared/routing';

export const genres = [
  { href: paths.movies, icon: <CupIcon />, text: 'Лучшие' },
  { href: paths.catalog({ year: '2022-2023' }), icon: <FireIcon />, text: 'Новые' },
  { href: paths.catalog({ genre: GenresEnum.Romance }), icon: <HeartsIcon />, text: 'Мелодраммы' },
  { href: paths.catalog({ genre: GenresEnum.Horror }), icon: <KnifeIcon />, text: 'Ужасы' },
  { href: paths.catalog({ genre: GenresEnum.Adventure }), icon: <MapIcon />, text: 'Приключения' },
  { href: paths.catalog({ genre: GenresEnum.ScienceFiction }), icon: <RocketIcon />, text: 'Фантастика' },
  { href: paths.catalog({ genre: GenresEnum.Family }), icon: <PeopleIcon />, text: 'Семейные' },
  { href: paths.catalog({ genre: GenresEnum.Comedy }), icon: <HappyIcon />, text: 'Комедии' },
  { href: paths.catalog({ genre: GenresEnum.Concert }), icon: <MusicIcon />, text: 'Концерты' },
  { href: paths.catalog({ genre: GenresEnum.War }), icon: <TankIcon />, text: 'Военные' },
];
