import axios from 'axios';
import { createHttp } from 'effector-http-api';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { localStorageKeys } from 'shared/config';

export const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getCookie(localStorageKeys.ACCESS_TOKEN)}`;

  return config;
});

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      hasCookie(localStorageKeys.ACCESS_TOKEN) &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const { data } = await axios.get(`http://localhost:5000/api/refresh`, { withCredentials: true });

        setCookie(localStorageKeys.ACCESS_TOKEN, data.accessToken);
        return instance.request(originalRequest);
      } catch (e) {
        console.error(e);
      }
    }
  }
);

export const http = createHttp(instance);
