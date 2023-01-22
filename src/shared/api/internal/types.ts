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

export interface ResponseUser {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    id: string;
  };
}
