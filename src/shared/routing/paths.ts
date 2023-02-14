import { GenresEnum } from 'shared/config';

export const paths = {
  home: '/',
  films: '/films',
  series: '/series',
  cartoons: '/cartoons',
  profile: '/profile',
  newFilms: `/films?sort=year&year=2022-2023`,
  drama: `/films?sort=year&genre=${GenresEnum.Drama}`,
  comedyFilms: `/films?sort=year&genre=${GenresEnum.Komediya}`,
  forFamily: `/films?sort=year&genre=${GenresEnum.Semejnyj}`,
  policy: '/policy',
  movie: (id: number) => `/film/${id}`,
  person: (id: number) => `/name/${id}`,
};
