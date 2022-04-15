import { login, isSessionValid, logout } from './auth';
import { getEnvCredentials } from '../utils/tests';

describe('login flow against production', () => {
  it('should log in and verify that user is logged in', async () => {
    const credentials = await login(getEnvCredentials());
    expect(credentials.token).not.toBeNull();

    const status = await isSessionValid(credentials);
    expect(status).toBe(true);
  });

  it('should notice that the session and token are not logged in', async () => {
    const status = await isSessionValid({ token: 'oldtoken', sessionId: 'oldsession' });
    expect(status).toBe(false);
  });

  it('should logout', async () => {
    const credentials = await login(getEnvCredentials());
    expect(credentials.token).not.toBeNull();

    let status = await isSessionValid(credentials);
    expect(status).toBe(true);

    await logout(credentials);

    status = await isSessionValid(credentials);
    expect(status).toBe(false);
  });
});
