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

export interface Status {
  status: boolean;
}

export interface FavoriteItems {
  items: string[];
}
