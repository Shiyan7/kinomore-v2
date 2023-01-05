import { RoutesEnum } from 'shared/config';

export const items = [
  { text: 'Главная', href: RoutesEnum.Home, timeout: 75 },
  { text: 'Фильмы', href: RoutesEnum.Films, timeout: 100 },
  { text: 'Сериалы', href: RoutesEnum.Series, timeout: 125 },
  { text: 'Мультфильмы', href: RoutesEnum.Cartoons, timeout: 150 },
  { text: 'Каталог', href: '#', timeout: 175 },
  { text: 'Избранное', href: '#', timeout: 200 },
  { text: 'История просмотров', href: '#', timeout: 225 },
];
