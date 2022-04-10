import { login, isLoggedIn } from './auth';

// NOTE: These tests are ran against the production to verify the integration and requires credentials to be set
// to the .env file
describe('login flow against production', () => {
  const username = process?.env['KILOMETRIKISA_USERNAME'] ?? '';
  const password = process?.env['KILOMETRIKISA_PASSWORD'] ?? '';

  it('should log in and verify that user is logged in', async () => {
    const credentials = await login(username, password);
    expect(credentials.token).not.toBeNull();

    const status = await isLoggedIn(credentials.token, credentials.sessionId);
    expect(status).toBe(true);
  });

  it('should notice that the session and token are not logged in', async () => {
    const status = await isLoggedIn('oldtoken', 'oldsession');
    expect(status).toBe(false);
  });
});

