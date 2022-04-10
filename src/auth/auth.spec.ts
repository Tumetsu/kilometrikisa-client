import axios from 'axios';
import { KilometrikisaAuth } from './auth';

jest.mock('axios');

describe('login flow', () => {
  const mockCsrfTokenCookie = ['csrftoken=somecsrftoken;'];
  let mockedAxios: jest.Mocked<typeof axios>;
  let auth: KilometrikisaAuth;

  beforeEach(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>;
    auth = new KilometrikisaAuth();
  });

  describe('login', () => {
    it('should return credentials', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        headers: {
          'set-cookie': mockCsrfTokenCookie,
        },
      });
      mockedAxios.post.mockResolvedValueOnce({
        headers: {
          'set-cookie': [mockCsrfTokenCookie, 'sessionid=somesessionid;'],
        },
      });

      const credentials = await auth.login('username', 'hunter2');
      expect(credentials.token).toBe('somecsrftoken');
      expect(credentials.sessionId).toBe('somesessionid');
    });

    it('should throw an error if extracting CSRF token from cookie failed', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        headers: {
          'set-cookie': 'no token here;',
        },
      });

      await expect(auth.login('username', 'hunter2')).rejects.toThrow(
        'Could not extract CSRF token from login request'
      );
    });

    it('should throw an error if extracting session id failed', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        headers: {
          'set-cookie': mockCsrfTokenCookie,
        },
      });
      mockedAxios.post.mockResolvedValueOnce({
        headers: {
          'set-cookie': [mockCsrfTokenCookie, 'no session id here'],
        },
      });
      await expect(auth.login('username', 'hunter2')).rejects.toThrow(
        'Could not get token and sessionId from the login request'
      );
    });
  });

  describe('isLoggedIn', () => {
    it('should return true when Kilometrikisa response page does not contain Kirjaudu sisään keywords', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: 'No keywords here',
      });
      await expect(auth.isLoggedIn('username', 'hunter2')).resolves.toBe(true);
    });

    it('should return false when Kilometrikisa response page does contain Kirjaudu sisään keywords', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: '<html><body><h3>Kirjaudu sisään</h3></body>',
      });
      await expect(auth.isLoggedIn('username', 'hunter2')).resolves.toBe(false);
    });
  });
});
