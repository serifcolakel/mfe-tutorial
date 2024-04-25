import { z } from 'zod';

import {
  loginRequestSchema,
  loginResponseSchema,
  refreshTokenRequestSchema,
  refreshTokenResponseSchema,
  userProfileResponseSchema,
} from './schemas';

export type LoginRequest = z.infer<typeof loginRequestSchema>;

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export type UserProfileResponse = z.infer<typeof userProfileResponseSchema>;

export type RefreshTokenRequest = z.infer<typeof refreshTokenRequestSchema>;

export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>;
