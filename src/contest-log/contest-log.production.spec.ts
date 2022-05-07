import { login, SessionCredentials } from '../auth/auth';
import {
  getUserContestLogEntries,
  incrementContestLog,
  incrementMinuteContestLog,
  updateContestLog,
  updateMinuteContestLog,
} from './contest-log';
import { KilometrikisaErrorCode } from '../utils/error-handling';
import { getEnvCredentials } from '../utils/tests';

describe('contest log', () => {
  let credentials: SessionCredentials;

  beforeAll(async () => {
    credentials = await login(getEnvCredentials());
  });

  it("should fetch user's distance entries", async () => {
    const results = await getUserContestLogEntries(47, 2022, credentials);
    expect(results.length).toBeGreaterThan(0);
  });

  describe.skip('incrementContestLog', () => {
    it('should increment kilometers for given day', async () => {
      await incrementContestLog(47, '2022-05-07', 1, false, credentials);
    });

    it('should increment minutes for given day', async () => {
      await incrementMinuteContestLog(47, '2022-05-04', 0, 1, false, credentials);
    });
  });

  describe('updateContestLog', () => {
    it('should throw an error if authentication failed', async () => {
      await expect(
        updateContestLog(43, '2023-05-01', 10, false, {
          token: credentials.token,
          sessionId: 'badsession',
        })
      ).rejects.toBeKilometrikisaError(KilometrikisaErrorCode.EXPIRED_SESSION);
    });
  });

  describe('updateMinuteContestLog', () => {
    it('should throw an error if authentication failed', async () => {
      await expect(
        updateMinuteContestLog(43, '2023-05-01', 1, 30, false, {
          token: credentials.token,
          sessionId: 'badsession',
        })
      ).rejects.toBeKilometrikisaError(KilometrikisaErrorCode.EXPIRED_SESSION);
    });
  });
});
