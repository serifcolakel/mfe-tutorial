import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { ENV } from '../common';
import { handleErrorResponse } from '../helpers';

// TODO (serif) : handle request here
export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(ENV.NX_ACCESS_TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

// TODO (serif) : handle response here
export const responseInterceptor = (response: AxiosResponse) => response;

// TODO (serif) : handle error response here
export const errorInterceptor = async (error: AxiosError) =>
  Promise.reject(handleErrorResponse(error));
