import axios, { RawAxiosRequestHeaders } from 'axios';
import { createStore } from 'effector';
import { createHttp } from 'effector-http-api';

export const instance = axios.create({
  baseURL: process.env.INTERNAL_API_URL,
});

const $headers = createStore<RawAxiosRequestHeaders>({});
export const http = createHttp(instance, $headers);
