/**
 * @description PRODUCTS paths for the PLATZI STORE API service
 */
export const PLATZI_STORE_PRODUCTS_PATHS = {
  PRODUCT: {
    GET_ALL: '/products',
    GET_SINGLE: '/products/:id',
    CREATE: '/products',
    UPDATE: '/products/:id',
    DELETE: '/products/:id',
  },
  AUTH: {
    LOGIN: '/auth/login',
    PROFILE: '/auth/profile',
    REFRESH_TOKEN: '/auth/refresh-token',
  },
};
