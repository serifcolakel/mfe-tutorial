/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

/**
 * @description Gets the parameters from the environment variables.
 * @param {Record<string, string>} env The environment variables.
 * @param {z.ZodObject<any, any>} schema The schema.
 * @returns The errors and the data.
 */
export function getEnvParams(
  env: Record<string, string>,
  schema: z.ZodObject<any, any>
): [Record<string, string> | null, z.infer<typeof schema> | null] {
  const data: Record<string, unknown> = {};
  const errors: Record<string, string> = {};

  for (const key in schema.shape) {
    if (Object.prototype.hasOwnProperty.call(schema.shape, key)) {
      const value = env[key];

      if (value === undefined) {
        errors[key] = `ERROR (serif) : Missing required env var: ${key}`;
      } else {
        try {
          data[key] = (schema.shape[key] as z.ZodTypeAny)?.parse(value);
        } catch (error) {
          let message = 'INFO (serif) : Invalid env var';

          if (error instanceof z.ZodError) {
            message = `ERROR (serif) : ${error.errors[0].message}`;
          } else if (error instanceof Error) {
            message = `ERROR (serif) : ${error.message}`;
          }

          errors[key] = message;
        }
      }
    }
  }

  if (Object.keys(errors).length) {
    return [errors, null];
  }

  return [null, data as z.infer<typeof schema>];
}
