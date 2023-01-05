import { RoutesEnum } from 'shared/config';

export function getMovieBreadcrumb(type: string | undefined): { text: string; href: string } {
  switch (type) {
    case 'movie':
      return { text: 'Фильмы', href: RoutesEnum.Films };
    case 'cartoon':
      return { text: 'Мультфильмы', href: RoutesEnum.Cartoons };
    default:
      return { text: 'Сериалы', href: RoutesEnum.Series };
  }
}
