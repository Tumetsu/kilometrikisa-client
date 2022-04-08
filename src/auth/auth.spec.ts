import { KilometrikisaAuth } from './auth';
import { curlClient } from '../utils/curl';
import {
  failureSubmitResponse,
  isLoggedInResponse,
  isNotLoggedInResponse,
  successfulSubmitResponse,
} from './kilometrikisa-responses.mock';

describe('login flow against production', () => {
  // NOTE: These tests are ran against the production to verify the integration and requires credentials to be set
  // to the .env file
  const username = process?.env['KILOMETRIKISA_USERNAME'] ?? '';
  const password = process?.env['KILOMETRIKISA_PASSWORD'] ?? '';

  const auth = new KilometrikisaAuth(curlClient);

  it('should log in and verify that user is logged in', async () => {
    const credentials = await auth.login(username, password);
    expect(credentials.token).not.toBeNull();

    const status = await auth.isLoggedIn(credentials.token, credentials.sessionId);
    expect(status).toBe(true);
  });
});

describe('login flow', () => {
  const mockCsrfTokenResponse = ['Set-Cookie: csrftoken=somecsrftoken;'];

  let mockCurl: {
    get: jest.Mock;
    post: jest.Mock;
  };

  let auth: KilometrikisaAuth;

  beforeEach(() => {
    mockCurl = {
      get: jest.fn(),
      post: jest.fn(),
    };

    auth = new KilometrikisaAuth(mockCurl);
  });

  describe('login', () => {
    it('should return credentials', async () => {
      mockCurl.get.mockReturnValueOnce(mockCsrfTokenResponse);
      mockCurl.post.mockReturnValueOnce(successfulSubmitResponse);

      const credentials = await auth.login('username', 'hunter2');
      expect(credentials.token).toBe('somecsrftoken');
      expect(credentials.sessionId).toBe('somesessionid');
    });

    it('should throw an error if extracting CSRF token from cookie failed', async () => {
      mockCurl.get.mockReturnValueOnce(['Set-Cookie: no token here']);
      mockCurl.get.mockReturnValueOnce({
        headers: {
          'set-cookie': ['no token here;'], // Does not contain a proper CSRF token
        },
      });

      await expect(auth.login('username', 'hunter2')).rejects.toThrow(
        'Could not extract CSRF token from login request'
      );
    });

    it('should throw an error if extracting session id failed', async () => {
      mockCurl.get.mockReturnValueOnce(mockCsrfTokenResponse);
      mockCurl.post.mockReturnValueOnce(failureSubmitResponse);
      await expect(auth.login('username', 'hunter2')).rejects.toThrow(
        'Could not get token and sessionId from the login request'
      );
    });
  });

  describe('isLoggedIn', () => {
    it('should return true when Kilometrikisa response does NOT contain certain keywords', async () => {
      mockCurl.get.mockReturnValueOnce(isLoggedInResponse);
      await expect(auth.isLoggedIn('username', 'hunter2')).resolves.toBe(true);
    });

    it('should return false when Kilometrikisa response does contain certain keywords', async () => {
      mockCurl.get.mockReturnValueOnce(isNotLoggedInResponse);
      await expect(auth.isLoggedIn('username', 'hunter2')).resolves.toBe(false);
    });
  });
});
