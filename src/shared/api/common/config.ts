import axios from 'axios';
import { createHttp } from 'effector-http-api';

export const commonInstance = axios.create({
  baseURL: process.env.API_URL,
  params: {
    token: process.env.API_TOKEN,
  },
});

export const http = createHttp(commonInstance);
