export interface HeroMovie {
  id: number;
  title: string;
  image: string;
  rating: string;
  year: number;
  genre: string;
  trailer: string;
  scale: string;
}

export interface AuthDto {
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  message: string;
}
