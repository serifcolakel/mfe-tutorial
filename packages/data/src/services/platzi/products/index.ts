import { handleErrorResponse } from '../../../helpers';
import { BaseServiceResponse } from '../../../types';
import { PLATZI_STORE_PRODUCTS_PATHS } from '../contants';
import { platziStoreApiMethods as methods } from '../methods';
import {
  allProductsResponseSchema,
  createProductRequestSchema,
  createProductResponseSchema,
  productSchema,
  updateProductRequestSchema,
  updateProductResponseSchema,
} from './schemas';
import {
  CreateProductRequest,
  CreateProductResponse,
  Product,
  UpdateProductRequest,
  UpdateProductResponse,
} from './types';

/**
 * @description Gets all products from the API.
 * @returns {Promise<BaseServiceResponse<Product[]>>} A Promise that resolves to an array of Post.
 */
export const getProducts = async (): Promise<
  BaseServiceResponse<Product[]>
> => {
  try {
    const response = await methods.get<Product[]>(
      PLATZI_STORE_PRODUCTS_PATHS.PRODUCT.GET_ALL,
      {
        params: {
          limit: 10,
          offset: 1,
        },
      }
    );

    const data = allProductsResponseSchema.parse(response.data);

    return {
      data,
      message: response.statusText,
      success: true,
    };
  } catch (e) {
    return handleErrorResponse(e);
  }
};

/**
 * @description Gets a single product from the API.
 * @param {string} id The product ID.
 * @returns {Promise<BaseServiceResponse<Product>>} A Promise that resolves to a Product.
 */
export const getProduct = async (
  id: string
): Promise<BaseServiceResponse<Product>> => {
  try {
    const response = await methods.get<Product>(
      PLATZI_STORE_PRODUCTS_PATHS.PRODUCT.GET_SINGLE.replace(':id', id)
    );

    const data = productSchema.parse(response.data);

    return {
      data,
      message: response.statusText,
      success: true,
    };
  } catch (e) {
    return handleErrorResponse(e);
  }
};

/**
 * @description Creates a new product.
 * @param {CreateProductRequest} product The product to create.
 * @returns {Promise<BaseServiceResponse<CreateProductResponse>>} A Promise that resolves to a Product.
 */
export const createProduct = async (
  product: CreateProductRequest
): Promise<BaseServiceResponse<CreateProductResponse>> => {
  try {
    const values = createProductRequestSchema.parse(product);

    const response = await methods.post<
      CreateProductRequest,
      CreateProductResponse
    >(PLATZI_STORE_PRODUCTS_PATHS.PRODUCT.CREATE, values);

    const data = createProductResponseSchema.parse(response.data);

    return {
      data,
      message: response.statusText,
      success: true,
    };
  } catch (e) {
    return handleErrorResponse(e);
  }
};

/**
 * @description Updates a product.
 * @param {string} id The product ID.
 * @param {UpdateProductRequest} product The product to update.
 * @returns {Promise<BaseServiceResponse<UpdateProductResponse>>} A Promise that resolves to a Product.
 */
export const updateProduct = async (
  id: string,
  product: UpdateProductRequest
): Promise<BaseServiceResponse<UpdateProductResponse>> => {
  try {
    const values = updateProductRequestSchema.parse(product);

    const response = await methods.put<
      UpdateProductRequest,
      UpdateProductResponse
    >(PLATZI_STORE_PRODUCTS_PATHS.PRODUCT.UPDATE.replace(':id', id), values);

    const data = updateProductResponseSchema.parse(response.data);

    return {
      data,
      message: response.statusText,
      success: true,
    };
  } catch (e) {
    return handleErrorResponse(e);
  }
};

/**
 * @description Deletes a product.
 * @param {string} id The product ID.
 * @returns {Promise<BaseServiceResponse<boolean>>} A Promise that resolves to null.
 */
export const deleteProduct = async (
  id: string
): Promise<BaseServiceResponse<boolean>> => {
  try {
    const res = await methods.remove<boolean>(
      PLATZI_STORE_PRODUCTS_PATHS.PRODUCT.DELETE.replace(':id', id)
    );

    return {
      data: res.data,
      message: 'Product deleted successfully.',
      success: true,
    };
  } catch (e) {
    return handleErrorResponse(e);
  }
};

export type {
  CreateProductRequest,
  CreateProductResponse,
  Product,
  UpdateProductRequest,
  UpdateProductResponse,
};

export {
  allProductsResponseSchema,
  createProductRequestSchema,
  createProductResponseSchema,
  productSchema,
  updateProductRequestSchema,
  updateProductResponseSchema,
};
