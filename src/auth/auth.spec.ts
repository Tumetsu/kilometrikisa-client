import { isLoggedIn, login } from './auth';

// NOTE: These tests are ran against the production to verify the integration and requires credentials to be set
// to the .env file
const username = process.env['KILOMETRIKISA_USERNAME'] ?? '';
const password = process.env['KILOMETRIKISA_PASSWORD'] ?? '';

describe('login flow', () => {
  it('should log in and verify that user is logged in', async () => {
    const credentials = await login(username, password);
    expect(credentials.token).not.toBeNull();

    const status = await isLoggedIn(credentials.token, credentials.sessionId);
    expect(status).toBe(true);
  });
});
