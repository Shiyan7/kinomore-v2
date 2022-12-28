export interface Data<T> {
  docs: T[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}
export interface ExternalId {
  kpHd: string;
  imdb: string;
  tmdb: number;
}

export interface VendorNumbers {
  kp: number;
  imdb: number;
  tmdb: number;
  filmCritics: number;
  russianFilmCritics: number;
  await: number;
}

export interface Logo {
  url: string;
}

export interface Image {
  url: string;
  previewUrl: string;
}

export interface VendorImage {
  name: string;
  url: string;
  previewUrl: string;
}

export interface Name {
  name: string;
}

export interface Video {
  url: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export interface VideoTypes {
  trailers: Video[];
  teasers: Video[];
}

export interface Person {
  id: number;
  photo: string;
  name: string;
  enName: string;
  description: string;
  profession: string;
  enProfession: string;
}

export interface CurrencyValue {
  value: number;
  currency: string;
}

export interface Fees {
  world: CurrencyValue | undefined;
  russia: CurrencyValue | undefined;
  usa: CurrencyValue | undefined;
}

export interface Distributor {
  distributor: string;
  distributorRelease: string;
}

export interface Premiere {
  country: string;
  world: string;
  russia: string;
  digital: string;
  cinema: string;
  bluray: string;
  dvd: string;
}

export interface SpokenLanguages {
  name: string;
  nameEn: string;
}

export interface Images {
  postersCount: number;
  backdropsCount: number;
  framesCount: number;
}

export interface Value {
  value: string;
}

export interface Fact {
  value: string;
  type: string;
  spoiler: boolean;
}

export interface ReviewInfo {
  count: number;
  positiveCount: number;
  percentage: string;
}

export interface SeasonInfo {
  number: number;
  episodesCount: number;
}

export interface LinkedMovie {
  id: number;
  name: string;
  enName: string;
  alternativeName: string;
  type: string;
  poster: Image | undefined;
}

export interface WatchabilityItem {
  name: string;
  logo: Logo | undefined;
  url: string;
}

export interface Watchability {
  items: WatchabilityItem[];
}

export interface Technology {
  hasImax: boolean;
  has3d: boolean;
}

export interface Lists {
  countries: string[];
  genres: string[];
  directors: string[];
  screenwriters: string[];
  producers: string[];
  operators: string[];
  composers: string[];
  artists: string[];
  editors: string[];
  actors: string[];
}

export interface Id {
  id: number;
}

export interface IMovie {
  id: number;
  externalId: ExternalId | undefined;
  name: string;
  alternativeName: string;
  enName: string;
  names: Name[];
  type: string;
  typeNumber: number;
  subType: string;
  year: number;
  description: string;
  shortDescription: string;
  slogan: string;
  status: string;
  facts: Fact[];
  rating: VendorNumbers | undefined;
  votes: VendorNumbers | undefined;
  movieLength: number;
  ratingMpaa: string;
  ageRating: number;
  logo: Logo | undefined;
  poster: Image | undefined;
  horizontalPoster: Image | undefined;
  backdrop: Image | undefined;
  imagesInfo: Images | undefined;
  videos: VideoTypes | undefined;
  genres: Name[];
  countries: Name[];
  persons: Person[];
  color: string;
  networks: VendorImage | undefined;
  distributors: Distributor | undefined;
  spokenLanguages: SpokenLanguages[];
  reviewInfo: ReviewInfo | undefined;
  seasonsInfo: SeasonInfo[];
  productionCompanies: VendorImage[];
  budget: CurrencyValue | undefined;
  fees: Fees | undefined;
  premiere: Premiere | undefined;
  ticketsOnSale: boolean;
  technology: Technology | undefined;
  similarMovies: LinkedMovie[];
  sequelsAndPrequels: LinkedMovie[];
  watchability: Watchability | undefined;
  lists: Lists | undefined;
  kinopoiskId: number;
}

interface MoviePoster {
  previewUrl: string;
  url: string;
}

export interface MovieRating {
  await: number;
  filmCritics: number;
  imdb: number;
  kp: number;
  russianFilmCritics: number;
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
  logo: Logo;
  movieLength: number;
  name: string;
  names: { name: string }[];
  poster: MoviePoster;
  rating?: MovieRating;
  shortDescription: string;
  type: string;
  votes: MovieRating;
  year: number;
  watchability: Watchability[];
}
