import { LoginCredentials } from '../auth/auth';

export function getAuthConfig(url: string, credentials: LoginCredentials) {
  return {
    headers: {
      Referer: url,
      Cookie: `csrftoken=${credentials.token}; sessionid=${credentials.sessionId};`,
    },
  };
}

