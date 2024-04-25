import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { handleErrorResponse } from '../../helpers/service.helpers';

const axiosBaseQuery =
  <T>(
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig<T>['method'];
      data?: AxiosRequestConfig<T>['data'];
      params?: AxiosRequestConfig<T>['params'];
      headers?: AxiosRequestConfig<T>['headers'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params: params as unknown as Record<string, string>,
        headers,
      });

      return { data: result.data };
    } catch (error) {
      const result = handleErrorResponse(error);

      return {
        error: {
          status: result.status,
          data: result.message,
        },
      };
    }
  };

export { axiosBaseQuery };
