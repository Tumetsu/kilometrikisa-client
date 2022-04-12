import { login } from '../index';
import { SessionCredentials } from '../auth/auth';
import { getUserLogEntries } from './contest-log';

describe('contest log', () => {
  const username = process?.env['KILOMETRIKISA_USERNAME'] ?? '';
  const password = process?.env['KILOMETRIKISA_PASSWORD'] ?? '';

  let credentials: SessionCredentials;

  beforeAll(async () => {
    credentials = await login(username, password);
  });

  it("should fetch user's distance entries", async () => {
    const results = await getUserLogEntries('45', 2021, credentials);
    expect(results.length).toBeGreaterThan(0);
  });
});
