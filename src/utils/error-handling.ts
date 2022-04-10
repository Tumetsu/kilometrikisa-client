import axios from 'axios';

/**
 * Check if the given error is an Axios error and if it is, check its status code and throw error
 * with given message.
 */
export function transformAxiosError(err: unknown, statusCode: number, errorMessage: string) {
  if (axios.isAxiosError(err)) {
    if (err.response?.status === statusCode) {
      throw new Error(errorMessage);
    }
  }
}
