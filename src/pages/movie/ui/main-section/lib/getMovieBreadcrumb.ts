import { paths } from 'shared/routes';

export function getMovieBreadcrumb(type: string | undefined): { text: string; href: string } {
  switch (type) {
    case 'movie':
      return { text: 'Фильмы', href: paths.films };
    case 'cartoon':
      return { text: 'Мультфильмы', href: paths.cartoons };
    default:
      return { text: 'Сериалы', href: paths.series };
  }
}
