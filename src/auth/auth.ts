import axios from 'axios';
import * as curl from '../utils/curl';
const KILOMETRIKISA_LOGIN_URL = 'https://www.kilometrikisa.fi/accounts/login/';
const KILOMETRIKISA_ACCOUNT_URL = 'https://www.kilometrikisa.fi/accounts/index/';

interface LoginCredentials {
  token: string;
  sessionId: string;
}

/**
 * Try to login in to the Kilometrikisa by using username and password. If successful, return
 * token and sessionId which can be used to do api calls to the service.
 *
 * @param username
 * @param password
 */
export async function login(username: string, password: string): Promise<LoginCredentials> {
  const loginPage = await axios.get(KILOMETRIKISA_LOGIN_URL);
  const csrfToken = getCsrfTokenFromCookieHeader(loginPage.headers['set-cookie'] ?? ['']);

  return submitLoginDetails(username, password, csrfToken);
}

function getCsrfTokenFromCookieHeader(setCookieRows: string[]) {
  const csrfToken = getTokenFromString(setCookieRows[0], 'csrftoken');
  if (!csrfToken) {
    throw new Error('Could not extract CSRF token from login request');
  }

  return csrfToken;
}

function getTokenFromString(text: string, tokenName: string) {
  return text.match(`.*${tokenName}=(.*?);`)?.[1];
}

async function submitLoginDetails(
  username: string,
  password: string,
  csrfToken: string
): Promise<LoginCredentials> {
  const responseRows = await curl.post(
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
      token = getTokenFromString(row, 'csrftoken');
    }
    if (row.includes('Set-Cookie: sessionid=')) {
      sessionId = getTokenFromString(row, 'sessionid');
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
export async function isLoggedIn(token: string, sessionId: string): Promise<boolean> {
  const responseRows = await curl.get(KILOMETRIKISA_ACCOUNT_URL, {
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
