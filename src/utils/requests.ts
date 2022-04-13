import { SessionCredentials } from '../auth/auth';

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
