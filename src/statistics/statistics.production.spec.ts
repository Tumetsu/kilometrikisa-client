import { getTeamMemberStatistics, getTeamStatistics } from './statistics';
import { login, SessionCredentials } from '../auth/auth';
import { getEnvCredentials } from '../utils/tests';

describe('statistics', () => {
  describe('fetch team statistics from production', () => {
    const teamSlug = process?.env['KILOMETRIKISA_TEAM_SLUG'] ?? '';
    const contestSlug = process?.env['KILOMETRIKISA_CONTEST_SLUG'] ?? '';

    let credentials: SessionCredentials;

    describe('team member statistics', () => {
      beforeAll(async () => {
        credentials = await login(getEnvCredentials());
      });

      it('should fetch team member statistics', async () => {
        const results = await getTeamMemberStatistics(teamSlug, contestSlug, credentials);
        expect(results.distanceStatistics.length).toBeGreaterThan(0);
      });
    });

    it('should fetch team statistics', async () => {
      const results = await getTeamStatistics('elomatic');
      expect(results.length).toBe(2);
    });
  });
});
