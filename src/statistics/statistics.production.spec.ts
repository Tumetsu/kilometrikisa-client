import { getTeamMemberStatistics, getTeamStatistics } from './statistics';
import { login } from '../index';
import { SessionCredentials } from '../auth/auth';

describe('statistics', () => {
  describe('fetch team statistics from production', () => {
    const username = process?.env['KILOMETRIKISA_USERNAME'] ?? '';
    const password = process?.env['KILOMETRIKISA_PASSWORD'] ?? '';
    const teamSlug = process?.env['KILOMETRIKISA_TEAM_SLUG'] ?? '';
    const contestSlug = process?.env['KILOMETRIKISA_CONTEST_SLUG'] ?? '';

    let credentials: SessionCredentials;

    beforeAll(async () => {
      credentials = await login({ username, password });
    });

    it('should fetch team statistics', async () => {
      const results = await getTeamStatistics('vincit-forza');
      expect(results).not.toBeNull();
    });

    it('should fetch team member statistics', async () => {
      const results = await getTeamMemberStatistics(teamSlug, contestSlug, credentials);
      expect(results.distanceStatistics.length).toBeGreaterThan(0);
    });
  });
});
