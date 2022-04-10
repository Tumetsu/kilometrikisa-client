import axios from 'axios';
const KILOMETRIKISA_LOGIN_URL = 'https://www.kilometrikisa.fi/accounts/login/';
const KILOMETRIKISA_ACCOUNT_URL = 'https://www.kilometrikisa.fi/accounts/index/';

export interface LoginCredentials {
  token: string;
  sessionId: string;
}

export class KilometrikisaAuth {
  /**
   * Try to login in to the Kilometrikisa by using username and password. If successful, return
   * token and sessionId which can be used to do api calls to the service.
   *
   * @param username
   * @param password
   */
  public async login(username: string, password: string): Promise<LoginCredentials> {
    const csrfToken = await this.fetchCsrfToken();

    return this.submitLoginDetails(username, password, csrfToken);
  }

  private async fetchCsrfToken() {
    const response = await axios.get(KILOMETRIKISA_LOGIN_URL);
    const csrfToken = this.getCsrfTokenFromCookieHeader(response.headers['set-cookie'] ?? ['']);

    if (!csrfToken) {
      throw new Error('Could not extract CSRF token from login request');
    }

    return csrfToken;
  }

  private getCsrfTokenFromCookieHeader(setCookieRows: string[]) {
    const csrfToken = this.getTokenFromString(setCookieRows[0], 'csrftoken');
    if (!csrfToken) {
      throw new Error('Could not extract CSRF token from login request');
    }

    return csrfToken;
  }

  private getTokenFromString(text: string, tokenName: string) {
    return text.match(`.*${tokenName}=(.*?);`)?.[1];
  }

  private async submitLoginDetails(
    username: string,
    password: string,
    csrfToken: string
  ): Promise<LoginCredentials> {
    const response = await axios.post(
      KILOMETRIKISA_LOGIN_URL,
      `username=${username}&password=${password}&csrfmiddlewaretoken=${csrfToken}`,
      {
        headers: {
          Referer: KILOMETRIKISA_LOGIN_URL,
          Cookie: `csrftoken=${csrfToken}`,
        },
        withCredentials: true,
        maxRedirects: 0, // The sessionid is in the redirect response so do not follow that
        validateStatus: function (status) {
          // We expect status 302, since that contains sessionId! For some reason Kilometrikisa site first responds with
          // 302 which contains sessionId and then returns another page with 200 without the said sessionId in headers.
          return status === 302;
        },
      }
    );

    const [, sessionIdCookie] = response.headers['set-cookie'] as string[];
    const sessionId = this.getTokenFromString(sessionIdCookie, 'sessionid');

    if (!csrfToken || !sessionId) {
      throw new Error('Could not get token and sessionId from the login request');
    }

    return {
      token: csrfToken,
      sessionId,
    };
  }

  /**
   * Check if the given token and session id are still valid.
   * @param token
   * @param sessionId
   */
  public async isLoggedIn(token: string, sessionId: string): Promise<boolean> {
    const response = await axios.get(KILOMETRIKISA_ACCOUNT_URL, {
      headers: {
        Referer: KILOMETRIKISA_LOGIN_URL,
        Cookie: `csrftoken=${token}; sessionid=${sessionId};`,
      },
    });

    // Trying to figure out if the session is still valid is a bit hacky. We check the contents of the response and
    // try to see if the page contains "Kirjaudu sisään" keywords to deduce if the session is still valid.
    // TODO: Maybe we could instead try to POST some nonsense to the server and check if we get 403 as a response...?
    return !response.data.includes('Kirjaudu sisään');
  }
}
