import axios from 'axios';
import { createHttp } from 'effector-http-api';

const BASE_URL = process.env.INTERNAL_API_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const http = createHttp(instance);
