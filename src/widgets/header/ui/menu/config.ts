import { paths } from 'shared/routing';

export const items = [
  { text: 'Главная', href: paths.home, timeout: 75 },
  { text: 'Фильмы', href: paths.movies, timeout: 100 },
  { text: 'Сериалы', href: paths.series, timeout: 125 },
  { text: 'Мультфильмы', href: paths.cartoons, timeout: 150 },
  { text: 'Избранное', href: paths.favorites, timeout: 175 },
  { text: 'История просмотров', href: paths.history, timeout: 200 },
];
