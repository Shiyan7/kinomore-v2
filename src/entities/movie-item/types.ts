interface IMoviePoster {
  previewUrl: string;
  url: string;
}

interface IMovieRating {
  await: number;
  filmCritics: number;
  imdb: number;
  kp: number;
  russianFilmCritics: number;
}

interface ILogo {
  url: string;
}

interface IWatchability {
  logo: ILogo;
  name: string;
  url: string;
}

export interface IMovieItem {
  alternativeName: string;
  description: string;
  enName: string;
  externalId: {
    imdb: string;
    kpHD: null;
    tmdb: number;
  };
  id: number;
  logo: ILogo;
  movieLength: number;
  name: string;
  names: { name: string }[];
  poster: IMoviePoster;
  rating?: IMovieRating;
  shortDescription: string;
  type: string;
  votes: IMovieRating;
  year: number;
  watchability: IWatchability[];
}
