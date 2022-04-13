import { login, SessionCredentials } from '../auth/auth';
import { getUserContestLogEntries, updateContestLog } from './contest-log';
import { KilometrikisaErrorCode } from '../utils/error-handling';

describe('contest log', () => {
  const username = process?.env['KILOMETRIKISA_USERNAME'] ?? '';
  const password = process?.env['KILOMETRIKISA_PASSWORD'] ?? '';

  let credentials: SessionCredentials;

  beforeAll(async () => {
    credentials = await login({ username, password });
  });

  it("should fetch user's distance entries", async () => {
    const results = await getUserContestLogEntries('45', 2021, credentials);
    expect(results.length).toBeGreaterThan(0);
  });

  describe('updateContestLog', () => {
    it('should throw an error if authentication failed', async () => {
      await expect(
        updateContestLog(43, '2023-05-01', 10, {
          token: credentials.token,
          sessionId: 'badsession',
        })
      ).rejects.toBeKilometrikisaError(KilometrikisaErrorCode.EXPIRED_SESSION);
    });
  });
});
