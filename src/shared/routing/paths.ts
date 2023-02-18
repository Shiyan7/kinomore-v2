interface CatalogParams {
  genre?: string;
  year?: string;
  sort?: string;
}

export const paths = {
  home: '/',
  movies: '/films',
  series: '/series',
  cartoons: '/cartoons',
  profile: '/profile',
  policy: '/policy',

  // Get the URL for the movie catalog page
  catalog: (params: CatalogParams): string => {
    const searchParams = new URLSearchParams({ ...params });
    const url = `/films?${searchParams}`;

    return url;
  },

  // Get the URL for the movie page
  movie: (id: number): string => `/film/${id}`,

  // Get the URL for the person page
  person: (id: number): string => `/name/${id}`,
};
