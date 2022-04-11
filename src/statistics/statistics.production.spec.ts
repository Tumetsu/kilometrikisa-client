import { getTeamMemberStatistics, getTeamStatistics } from './statistics';
import { login } from '../index';
import { LoginCredentials } from '../auth/auth';

describe('statistics', () => {
  describe('fetch team statistics from production', () => {
    const username = process?.env['KILOMETRIKISA_USERNAME'] ?? '';
    const password = process?.env['KILOMETRIKISA_PASSWORD'] ?? '';
    const teamSlug = process?.env['KILOMETRIKISA_TEAM_SLUG'] ?? '';
    const competitionSlug = process?.env['KILOMETRIKISA_COMPETITION_SLUG'] ?? '';

    let credentials: LoginCredentials;

    beforeAll(async () => {
      credentials = await login(username, password);
    });

    it('should fetch team statistics', async () => {
      const results = await getTeamStatistics('vincit-forza');
      expect(results).not.toBeNull();
    });

    it('should fetch team member statistics', async () => {
      const results = await getTeamMemberStatistics(teamSlug, competitionSlug, credentials);
      expect(results.distanceStatistics.length).toBeGreaterThan(0);
    });
  });
});
