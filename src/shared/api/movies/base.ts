import axios from "axios";
import { createHttp } from "effector-http-api";

const instance = axios.create({
  baseURL: process.env.API_URL,
  params: {
    token: process.env.API_TOKEN,
  },
});

const http = createHttp(instance);

export { http };
