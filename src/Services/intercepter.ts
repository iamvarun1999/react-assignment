import axios, { InternalAxiosRequestConfig } from "axios";
import { AxiosResponse } from "axios";
import { store } from "../Store/store";


const instance = axios.create({
  baseURL: 'https://fakestoreapi.com/',
});

// Request interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store?.getState()?.auth?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  async (error) => {
    console.error(error);


    return Promise.reject(error);
  }
);

export default instance;
