/**
 * @description Base service response interface
 * @template T - Generic type for data
 * @interface BaseServiceResponse
 * @property {T | null} data - Data
 * @property {string} message - Message
 * @property {boolean} success - Success
 * @property {number | undefined} status - Status
 */
export type BaseServiceResponse<T> = {
  data: T | null;
  message: string;
  success: boolean;
  status?: number;
};
