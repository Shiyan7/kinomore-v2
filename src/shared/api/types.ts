export interface Data<T> {
  docs: T;
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface MoviePoster {
  previewUrl: string;
  url: string;
}

export interface MovieTrailer {
  name: string;
  site: string;
  url: string;
}

export interface MovieRating {
  await: number;
  filmCritics: number;
  imdb: number;
  kp: number;
  russianFilmCritics: number;
}

export interface MovieBudget {
  currency: string;
  value: number;
}

export interface MoviePremiere {
  cinema: Date;
  country: string;
  russia: Date;
  world: Date;
}

export interface MovieSeasonsInfo {
  number: number;
  episodesCount: number;
}

export interface MovieTechnology {
  has3D: boolean;
  hasImax: boolean;
}

export interface MoviePerson {
  id: number;
  name: string;
  enName: string;
  description: string;
  enProfession: "director" | "actor" | "design" | "producer" | "composer" | "editor";
  photo: string;
}

export interface MovieDistributors {
  distributor: string;
  distributorRelease: null;
}

export interface MovieProdComp {
  name: string;
  previewUrl: string;
  url: string;
}

export interface MovieSequels {
  alternativeName: string;
  enName: string;
  id: number;
  poster: MoviePoster;
  type: string;
}

export interface MovieLang {
  name: string;
  nameEn: string;
}

export interface Fees {
  value: number;
  currency: string;
}

export interface MovieFees {
  usa: Fees;
  world: Fees;
}

export interface Movie {
  ageRating: number;
  alternativeName: string;
  backdrop: { url: string };
  budget: MovieBudget;
  countries: { name: string }[];
  createDate: Date;
  description: string;
  distributors: MovieDistributors;
  fees: MovieFees;
  // facts: Fact[];
  genres: { name: string }[];
  id: number;
  enName: string;
  images: { framesCount: number };
  lists: [];
  logo: { url: string };
  movieLength: number;
  name: string;
  names: { name: string }[];
  persons: MoviePerson[];
  poster: MoviePoster;
  premiere: MoviePremiere;
  productionCompanies: MovieProdComp[];
  rating?: MovieRating;
  ratingMpaa: string;
  seasonsInfo?: MovieSeasonsInfo[];
  sequelsAndPrequels: MovieSequels[];
  shortDescription: string;
  similarMovies: Movie[];
  slogan: string;
  spokenLanguages: MovieLang[];
  status: string;
  technology: MovieTechnology;
  ticketsOnSale: boolean;
  type: string;
  typeNumber: number;
  updateDates: Date[];
  updatedAt: Date;
  videos: { trailers: MovieTrailer[] };
  votes: MovieRating;
  year: number;
}
