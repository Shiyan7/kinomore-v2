export interface AuthDto {
  email: string;
  password: string;
}

export interface Session {
  name: string;
  email: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Status {
  isNewUser: boolean;
}

export interface TokensDto {
  accessToken: string;
  refreshToken: string;
}
