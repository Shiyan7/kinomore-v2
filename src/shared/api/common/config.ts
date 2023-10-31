import axios from 'axios';
import { createHttp } from 'effector-http-api';

const BASE_URL = process.env.API_URL;

const X_API_KEY = process.env.API_TOKEN;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-API-KEY': X_API_KEY,
  },
});

export const http = createHttp(instance);
