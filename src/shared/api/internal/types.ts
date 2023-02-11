export interface HeroMovie {
  id: number;
  year: number;
  rating: string;
  title: string;
  genre: string;
  image: string;
}

export interface UserDto {
  email: string;
  password: string;
}

export interface Session {
  email: string;
  id: string;
}

export interface UserWithTokensDto {
  accessToken: string;
  refreshToken: string;
  user: Session;
}
