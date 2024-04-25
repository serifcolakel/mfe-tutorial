import { ENV } from '../common';
import {
  errorInterceptor,
  requestInterceptor,
  responseInterceptor,
} from '../lib/api.interceptors';
import { api } from './base.api';

export const platziStoreApi = api.create({
  baseURL: ENV.NX_BASE_PLATZI_STORE_SERVICE_URL,
});

platziStoreApi.interceptors.request.use(requestInterceptor, (error) =>
  Promise.reject(error)
);

platziStoreApi.interceptors.response.use(responseInterceptor, errorInterceptor);
