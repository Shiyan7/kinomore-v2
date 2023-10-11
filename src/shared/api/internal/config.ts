import axios from 'axios';
import { createHttp } from 'effector-http-api';

export const internalInstance = axios.create({
  baseURL: process.env.INTERNAL_API_URL,
  withCredentials: true,
});

internalInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const http = createHttp(internalInstance);
