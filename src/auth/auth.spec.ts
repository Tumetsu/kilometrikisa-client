import axios from 'axios';
import { login, isLoggedIn } from './auth';

jest.mock('axios');

describe('login flow', () => {
  const mockCsrfTokenCookie = ['csrftoken=somecsrftoken;'];
  let mockedAxios: jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>;
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

      const credentials = await login('username', 'hunter2');
      expect(credentials.token).toBe('somecsrftoken');
      expect(credentials.sessionId).toBe('somesessionid');
    });

    it('should throw an error if extracting CSRF token from cookie failed', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        headers: {
          'set-cookie': 'no token here;',
        },
      });

      await expect(login('username', 'hunter2')).rejects.toThrow(
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
      await expect(login('username', 'hunter2')).rejects.toThrow(
        'Could not get token and sessionId from the login request'
      );
    });
  });

  describe('isLoggedIn', () => {
    it('should return true when Kilometrikisa response page does not contain Kirjaudu sisään keywords', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: 'No keywords here',
      });
      await expect(isLoggedIn('username', 'hunter2')).resolves.toBe(true);
    });

    it('should return false when Kilometrikisa response page does contain Kirjaudu sisään keywords', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: '<html><body><h3>Kirjaudu sisään</h3></body>',
      });
      await expect(isLoggedIn('username', 'hunter2')).resolves.toBe(false);
    });
  });
});
