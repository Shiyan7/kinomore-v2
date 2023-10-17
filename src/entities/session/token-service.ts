import { TokensDto } from 'shared/api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './config';

class TokenService {
  setTokens(tokens: TokensDto): void {
    localStorage.setItem(ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN, tokens.refreshToken);
  }

  getRefreshToken(): string {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN) ?? '';

    return refreshToken;
  }

  hasAccessToken(): boolean {
    const token = localStorage.getItem(ACCESS_TOKEN);

    return Boolean(token);
  }

  hasRefreshToken(): boolean {
    const token = localStorage.getItem(REFRESH_TOKEN);

    return Boolean(token);
  }

  deleteTokens(): void {
    localStorage.clear();
  }
}

export const tokenService = new TokenService();
