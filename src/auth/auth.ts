import { Curl } from '../utils/curl';
const KILOMETRIKISA_LOGIN_URL = 'https://www.kilometrikisa.fi/accounts/login/';
const KILOMETRIKISA_ACCOUNT_URL = 'https://www.kilometrikisa.fi/accounts/index/';

export interface LoginCredentials {
  token: string;
  sessionId: string;
}

export class KilometrikisaAuth {
  constructor(private curl: Curl) {}

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

  private getTokenFromString(text: string, tokenName: string) {
    return text.match(`.*${tokenName}=(.*?);`)?.[1];
  }

  private async fetchCsrfToken() {
    const responseRows = await this.curl.get(KILOMETRIKISA_LOGIN_URL);
    const cookieRow = responseRows.find(row => row.includes('Set-Cookie:'));
    const csrfToken = this.getTokenFromString(cookieRow ?? '', 'csrftoken');

    if (!csrfToken) {
      throw new Error('Could not extract CSRF token from login request');
    }

    return csrfToken;
  }

  private async submitLoginDetails(
    username: string,
    password: string,
    csrfToken: string
  ): Promise<LoginCredentials> {
    const responseRows = await this.curl.post(
      KILOMETRIKISA_LOGIN_URL,
      {
        username,
        password,
        csrfmiddlewaretoken: csrfToken,
      },
      {
        headers: {
          Cookie: `csrftoken=${csrfToken}`,
        },
      }
    );

    let token;
    let sessionId;
    responseRows.forEach((row: string) => {
      if (row.includes('Set-Cookie: csrftoken=')) {
        token = this.getTokenFromString(row, 'csrftoken');
      }
      if (row.includes('Set-Cookie: sessionid=')) {
        sessionId = this.getTokenFromString(row, 'sessionid');
      }
    });

    if (!token || !sessionId) {
      throw new Error('Could not get token and sessionId from the login request');
    }

    return {
      token,
      sessionId,
    };
  }

  /**
   * Check if the given token and session id are still valid.
   * @param token
   * @param sessionId
   */
  public async isLoggedIn(token: string, sessionId: string): Promise<boolean> {
    const responseRows = await this.curl.get(KILOMETRIKISA_ACCOUNT_URL, {
      headers: {
        Cookie: `csrftoken=${token}; sessionid=${sessionId};`,
      },
    });

    // Figure out from curl stdout data if the location is on the login page or on account page.
    const loggedOut = responseRows.some(row => {
      return row.includes('Location:') && row.includes('login');
    });

    return !loggedOut;
  }
}
