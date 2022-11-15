import axiosStatic from "axios";

export const axios = axiosStatic.create({
  baseURL: process.env.API_URL,
  params: {
    token: process.env.API_TOKEN,
  },
});
