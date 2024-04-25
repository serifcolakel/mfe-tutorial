import { handleErrorResponse } from '../../../helpers';
import { BaseServiceResponse } from '../../../types';
import { PLATZI_STORE_PRODUCTS_PATHS } from '../contants';
import { platziStoreApiMethods as methods } from '../methods';
import {
  loginRequestSchema,
  loginResponseSchema,
  refreshTokenRequestSchema,
  refreshTokenResponseSchema,
  userProfileResponseSchema,
} from './schemas';
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  UserProfileResponse,
} from './types';

/**
 * @description Logs a user in.
 * @param {LoginRequest} info The user to log in.
 * @returns {Promise<BaseServiceResponse<LoginResponse>>} A Promise that resolves to a LoginResponse.
 */
export const login = async (
  info: LoginRequest
): Promise<BaseServiceResponse<LoginResponse>> => {
  try {
    const infos = loginRequestSchema.parse(info);

    const response = await methods.post<LoginRequest, LoginResponse>(
      PLATZI_STORE_PRODUCTS_PATHS.AUTH.LOGIN,
      infos
    );

    const data = loginResponseSchema.parse(response.data);

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
 * @description Gets the user profile.
 * @returns {Promise<BaseServiceResponse<UserProfileResponse>>} A Promise that resolves to a UserProfileResponse.
 */
export const getUserProfile = async (): Promise<
  BaseServiceResponse<UserProfileResponse>
> => {
  try {
    const response = await methods.get<UserProfileResponse>(
      PLATZI_STORE_PRODUCTS_PATHS.AUTH.PROFILE
    );

    const data = userProfileResponseSchema.parse(response.data);

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
 * @description Refreshes the token.
 * @param {RefreshTokenRequest} refreshToken The refresh token.
 * @returns {Promise<BaseServiceResponse<RefreshTokenResponse>>} A Promise that resolves to a RefreshTokenResponse.
 */
export const refreshToken = async (
  token: RefreshTokenRequest
): Promise<BaseServiceResponse<RefreshTokenResponse>> => {
  try {
    const values = refreshTokenRequestSchema.parse(token);

    const response = await methods.post<
      RefreshTokenRequest,
      RefreshTokenResponse
    >(PLATZI_STORE_PRODUCTS_PATHS.AUTH.REFRESH_TOKEN, values);

    const data = refreshTokenResponseSchema.parse(response.data);

    return {
      data,
      message: response.statusText,
      success: true,
    };
  } catch (e) {
    return handleErrorResponse(e);
  }
};

export type {
  LoginRequest,
  LoginResponse,
  UserProfileResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
};

export {
  loginRequestSchema,
  loginResponseSchema,
  refreshTokenRequestSchema,
  refreshTokenResponseSchema,
  userProfileResponseSchema,
};
