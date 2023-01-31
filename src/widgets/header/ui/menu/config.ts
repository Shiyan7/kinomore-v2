import { paths } from 'shared/routing';

export const items = [
  { text: 'Главная', href: paths.home, timeout: 75 },
  { text: 'Фильмы', href: paths.films, timeout: 100 },
  { text: 'Сериалы', href: paths.series, timeout: 125 },
  { text: 'Мультфильмы', href: paths.cartoons, timeout: 150 },
  { text: 'Каталог', href: '#', timeout: 175 },
  { text: 'Избранное', href: '#', timeout: 200 },
  { text: 'История просмотров', href: '#', timeout: 225 },
];
