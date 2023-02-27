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
  { href: paths.catalog({ genre: GenresEnum.Melodrama }), icon: <HeartsIcon />, text: 'Мелодраммы' },
  { href: paths.catalog({ genre: GenresEnum.Uzhasy }), icon: <KnifeIcon />, text: 'Ужасы' },
  { href: paths.catalog({ genre: GenresEnum.Priklyucheniya }), icon: <MapIcon />, text: 'Приключения' },
  { href: paths.catalog({ genre: GenresEnum.Fantastika }), icon: <RocketIcon />, text: 'Фантастика' },
  { href: paths.catalog({ genre: GenresEnum.Voennyj }), icon: <TankIcon />, text: 'Военные' },
  { href: paths.catalog({ genre: GenresEnum.Semejnyj }), icon: <PeopleIcon />, text: 'Семейные' },
  { href: paths.catalog({ genre: GenresEnum.Komediya }), icon: <HappyIcon />, text: 'Комедии' },
  { href: paths.catalog({ genre: GenresEnum.Koncert }), icon: <MusicIcon />, text: 'Концерты' },
];
