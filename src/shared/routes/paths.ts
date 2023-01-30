export const paths = {
  home: '/',
  films: '/films',
  series: '/series',
  cartoons: '/cartoons',
  profile: '/profile',
  newFilms: '/new-films',
  comedyFilms: '/comedy-films',
  forFamily: '/for-family',
  policy: '/policy',
  movie: (id: number) => `/film/${id}`,
  person: (id: number) => `/name/${id}`,
};
