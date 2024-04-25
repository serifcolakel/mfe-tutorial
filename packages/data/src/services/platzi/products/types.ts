import { z } from 'zod';

import {
  createProductRequestSchema,
  createProductResponseSchema,
  productSchema,
  updateProductRequestSchema,
  updateProductResponseSchema,
} from './schemas';

export type Product = z.infer<typeof productSchema>;

export type CreateProductRequest = z.infer<typeof createProductRequestSchema>;

export type CreateProductResponse = z.infer<typeof createProductResponseSchema>;

export type UpdateProductRequest = z.infer<typeof updateProductRequestSchema>;

export type UpdateProductResponse = z.infer<typeof updateProductResponseSchema>;

export type DeleteProductResponse = boolean;
