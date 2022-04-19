import { SessionCredentials } from '../auth/auth';
import { AxiosResponse } from 'axios';
import { KilometrikisaError, KilometrikisaErrorCode } from './error-handling';

export function getAuthConfig(url: string, credentials: SessionCredentials) {
  return {
    headers: {
      Referer: url,
      Cookie: `csrftoken=${credentials.token}; sessionid=${credentials.sessionId};`,
    },
  };
}

export function queryStringify(obj: Record<string, string | number>) {
  let queryString = '';
  for (const [key, value] of Object.entries(obj)) {
    queryString += `&${key}=${value}`;
  }
  return queryString.substring(1);
}

/**
 * Execute axios request but after request make sure that the result was authenticated. The Kilometrikisa api returns
 * 200 with html if one tries to use authenticated api with incorrect credentials so we have to check if the authentication
 * actually worked after the fact.
 */
export async function axiosAuthGuard(axiosRequest: Promise<AxiosResponse>) {
  const response = await axiosRequest;

  if (response.data.includes('Kirjaudu sisään')) {
    throw new KilometrikisaError(
      KilometrikisaErrorCode.EXPIRED_SESSION,
      'Authentication of the request failed. Session expired.'
    );
  }
  return response;
}

export function getSlugFromUrl(url: string) {
  const parts = url.split('/').filter(part => part);
  return parts[parts.length - 1];
}
