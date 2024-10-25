import axios from 'axios';

export const Axios = axios.create({
  baseURL: 'http://localhost:3000/', // Replace with API's base URL from env
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

Axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
