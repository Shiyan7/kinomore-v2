import { paths } from 'shared/routing';

export function getMovieBreadcrumb(type: string | undefined): { text: string; href: string } {
  switch (type) {
    case 'movie':
      return { text: 'Фильмы', href: paths.movies };
    case 'cartoon':
      return { text: 'Мультфильмы', href: paths.cartoons };
    default:
      return { text: 'Сериалы', href: paths.series };
  }
}
