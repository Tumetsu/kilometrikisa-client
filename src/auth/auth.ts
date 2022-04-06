import axios from 'axios';
const curl = require('curlrequest');
const KILOMETRIKISA_LOGIN_URL = 'https://www.kilometrikisa.fi/accounts/login/';
const KILOMETRIKISA_ACCOUNT_URL = 'https://www.kilometrikisa.fi/accounts/index/';
const AGENT = 'strava2kilometrikisa-agent';

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
  // TODO: Write this with Axios once you figure out how to by pass the CORS with it or remove Axios.
  // Strava2Kilometrikisa used curl in the original implementation which for some reason prints data about 302
  // response which happens to contain the token and sessionid. Axios seems to skip this part and instead
  // only returns the data about 403 response.
  const options = {
    url: 'https://www.kilometrikisa.fi/accounts/login/',
    method: 'POST',
    referer: 'https://www.kilometrikisa.fi/accounts/login/', // referer
    headers: {
      // "Referer": "https://www.kilometrikisa.fi/accounts/login/",
      Cookie: `csrftoken=${csrfToken}`, // cookie
    },
    data: {
      username,
      password,
      csrfmiddlewaretoken: csrfToken,
    },
    verbose: true,
    include: true,
    useragent: AGENT,
    location: false, // do not follow header location
  };

  return new Promise((resolve, reject) => {
    curl.request(options, function (err: unknown, stdout: string) {
      // Get CSRF value from cookie header by reading the stdout of the curl request
      const rows = stdout.split('\n');
      let token;
      let sessionId;
      rows.forEach((row: string) => {
        if (row.includes('Set-Cookie: csrftoken=')) {
          token = getTokenFromString(row, 'csrftoken');
        }
        if (row.includes('Set-Cookie: sessionid=')) {
          sessionId = getTokenFromString(row, 'sessionid');
        }
      });

      if (!token || !sessionId) {
        reject('Could not parse token and session id from response');
      } else {
        resolve({
          token,
          sessionId,
        });
      }
    });
  });
}

/**
 * Check if the given token and session id are still valid.
 * @param token
 * @param sessionId
 */
export async function isLoggedIn(token: string, sessionId: string): Promise<boolean> {
  const options = {
    url: KILOMETRIKISA_ACCOUNT_URL,
    method: 'GET',
    referer: KILOMETRIKISA_ACCOUNT_URL,
    headers: {
      Cookie: `csrftoken=${token}; sessionid=${sessionId};`,
    },
    verbose: true,
    include: true,
    useragent: AGENT,
    location: false, // do not follow header location
  };

  return new Promise((resolve, reject) => {
    curl.request(options, function (err: unknown, stdout: string) {
      if (err) {
        return reject(err);
      }
      const rows = stdout.split('\n');
      // Figure out from curl stdout data if the location is on the login page or on account page.
      const loggedOut = rows.some(row => {
        return row.includes('Location:') && row.includes('login');
      });

      resolve(!loggedOut);
    });
  });
}
