import { z } from 'zod';

export const loginRequestSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});

export const userProfileResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  role: z.string(),
  avatar: z.string(),
});

export const refreshTokenRequestSchema = z.object({ refreshToken: z.string() });

export const refreshTokenResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});
