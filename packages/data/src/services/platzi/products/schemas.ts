import { z } from 'zod';

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.object({ id: z.number(), name: z.string(), image: z.string() }),
  images: z.array(z.string()),
});

export const allProductsResponseSchema = z.array(productSchema);

export const createProductRequestSchema = z.object({
  title: z.string(),
  price: z.number(),
  description: z.string(),
  categoryId: z.number(),
  images: z.array(z.string()),
});

export const createProductResponseSchema = z.object({
  title: z.string(),
  price: z.number(),
  description: z.string(),
  images: z.array(z.string()),
  category: z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    creationAt: z.string(),
    updatedAt: z.string(),
  }),
  id: z.number(),
  creationAt: z.string(),
  updatedAt: z.string(),
});

export const updateProductRequestSchema = z.object({
  title: z.string(),
  price: z.number(),
});

export const updateProductResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  images: z.array(z.string()),
  creationAt: z.string(),
  updatedAt: z.string(),
  category: z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    creationAt: z.string(),
    updatedAt: z.string(),
  }),
});
