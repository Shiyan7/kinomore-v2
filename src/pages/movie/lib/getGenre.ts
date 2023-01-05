import { GenresEnum, RoutesEnum } from 'shared/config';

export function getGenre(genres: Array<{ name: string }>): { text: string; href: string } {
  switch (genres[genres.length - 1].name) {
    case GenresEnum.Komediya:
      return { text: 'Комедии', href: RoutesEnum.ComedyFilms };
    case GenresEnum.Boevik:
      return { text: 'Боевики', href: '/boevik' };
    case GenresEnum.Fentezi:
      return { text: 'Фэнтези', href: '/fentezi' };
    case GenresEnum.Fantastika:
      return { text: 'Фантастика', href: '/fantastika' };
    case GenresEnum.Triller:
      return { text: 'Триллеры', href: '/triller' };
    case GenresEnum.Voennyj:
      return { text: 'Военные', href: '/voennyj' };
    case GenresEnum.Detektiv:
      return { text: 'Детективы', href: '/detektiv' };
    case GenresEnum.Drama:
      return { text: 'Драмы', href: '/drama' };
    case GenresEnum.Uzhasy:
      return { text: 'Ужасы', href: '/uzhasy' };
    case GenresEnum.Kriminal:
      return { text: 'Криминал', href: '/kriminal' };
    case GenresEnum.Melodrama:
      return { text: 'Мелодрамы', href: '/melodrama' };
    case GenresEnum.Vestern:
      return { text: 'Вестерны', href: '/vestern' };
    case GenresEnum.Biografiya:
      return { text: 'Биографии', href: '/biografiya' };
    case GenresEnum.Anime:
      return { text: 'Аниме', href: '/anime' };
    case GenresEnum.Detskij:
      return { text: 'Детские', href: '/detskij' };
    case GenresEnum.Multfilm:
      return { text: 'Мультфильмы', href: '/multfilm' };
    case GenresEnum.FilmNuar:
      return { text: 'Фильм-нуары', href: '/film-nuar' };
    case GenresEnum.DlyaVzroslyh:
      return { text: 'Для взрослых', href: '/dlya-vzroslyh' };
    case GenresEnum.Dokumentalnyj:
      return { text: 'Документальные', href: '/dokumentalnyj' };
    case GenresEnum.Igra:
      return { text: 'Игры', href: '/igra' };
    case GenresEnum.Istoriya:
      return { text: 'Истории', href: '/istoriya' };
    case GenresEnum.Koncert:
      return { text: 'Концерты', href: '/koncert' };
    case GenresEnum.Korotkometrazhka:
      return { text: 'Короткометражки', href: '/korotkometrazhka' };
    case GenresEnum.Muzyka:
      return { text: 'Музыка', href: '/muzyka' };
    case GenresEnum.Myuzikl:
      return { text: 'Мюзиклы', href: '/myuzikl' };
    case GenresEnum.Novosti:
      return { text: 'Новости', href: '/novosti' };
    case GenresEnum.Priklyucheniya:
      return { text: 'Приключения', href: '/priklyucheniya' };
    case GenresEnum.RealnoeTv:
      return { text: 'Реальное ТВ', href: '/realnoe-tv' };
    case GenresEnum.Semejnyj:
      return { text: 'Семейные', href: '/semejnyj' };
    case GenresEnum.Sport:
      return { text: 'Спорты', href: '/sport' };
    case GenresEnum.TokShou:
      return { text: 'Ток-шоу', href: '/tok-shou' };
    case GenresEnum.Ceremoniya:
      return { text: 'Церемонии', href: '/ceremoniya' };
    default:
      return { text: 'Комедии', href: RoutesEnum.ComedyFilms };
  }
}
