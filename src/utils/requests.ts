import { SessionCredentials } from '../auth/auth';

export function getAuthConfig(url: string, credentials: SessionCredentials) {
  return {
    headers: {
      Referer: url,
      Cookie: `csrftoken=${credentials.token}; sessionid=${credentials.sessionId};`,
    },
  };
}
