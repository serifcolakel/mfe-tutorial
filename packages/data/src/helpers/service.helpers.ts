import { AxiosError } from 'axios';
import { ZodError } from 'zod';

import { BaseServiceResponse } from '../types';

/**
 * @description Handles the error response.
 * @param {unknown} error - Error
 * @param {string | undefined} message - Message
 * @returns {BaseServiceResponse<null>} The service response.
 * @example
 * const error = new Error('An error occurred.');
 * const result = handleErrorResponse(error);
 * console.log(result); // { data: null, message: 'An error occurred.', success: false }
 * @example
 * const error = new AxiosError('An error occurred.');
 * const result = handleErrorResponse(error);
 * console.log(result); // { data: null, message: 'An error occurred.', success: false }
 */
export const handleErrorResponse = <T>(
  error: unknown,
  message: string | undefined = 'Unknown error occurred.'
): BaseServiceResponse<T> => {
  let status: number | undefined;

  if (error instanceof Error) {
    message = error.message;
    status = 500;
  }

  if (error instanceof AxiosError) {
    message = error.message;
    status = error.response?.status;
  }

  if (error instanceof ZodError) {
    const paths = error.errors.map((err) => err.path[1]);
    const uniquePaths = [...new Set(paths)];

    message = `Error in fields: ${uniquePaths.join(', ')}`;

    status = 400;
  }

  return {
    data: null,
    message,
    success: false,
    status,
  };
};

/**
 * @description Formats the message of a service response.
 * @param {string} message The message to be formatted.
 * @param {string[]} replacerValues The strings to replace the placeholders in message.
 * @returns {string} The formatted message.
 * @example
 * const message = 'The {0} is {1}!';
 * const replace = ['answer', '42'];
 * const result = getServiceResponseMessage(message, replace);
 * console.log(result); // The answer is 42!
 */
export const getServiceResponseMessage = (
  message: string,
  replacerValues?: string[]
): string => {
  let result = message;

  if (replacerValues) {
    replacerValues.forEach((item, index) => {
      result = result.replace(`{${index}}`, item);
    });
  }

  return result;
};
