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

/**
 * Execute axios request but after request make sure that the result was authenticated. The Kilometrikisa api returns
 * 200 with html if one tries to use authenticated api with incorrect credentials so we have to check if the authentication
 * actually worked after the fact.
 */
export async function axiosAuthGuard(axiosRequest: Promise<AxiosResponse>) {
  const response = await axiosRequest;

  if (typeof response.data?.includes === 'function' && response.data.includes('Kirjaudu sisään')) {
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
