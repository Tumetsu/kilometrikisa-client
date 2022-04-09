import { getTeamMemberStatistics, getTeamStatistics } from './statistics';
import client from '../index';

describe('statistics', () => {
  describe('fetch team statistics from production', () => {
    const username = process?.env['KILOMETRIKISA_USERNAME'] ?? '';
    const password = process?.env['KILOMETRIKISA_PASSWORD'] ?? '';
    const teamSlug = process?.env['KILOMETRIKISA_TEAM_SLUG'] ?? '';
    const competitionSlug = process?.env['KILOMETRIKISA_COMPETITION_SLUG'] ?? '';

    it('should fetch team statistics', async () => {
      const results = await getTeamStatistics('vincit-forza');
      expect(results.length).toBeGreaterThan(0);
    });

    it('should fetch team member statistics', async () => {
      const credentials = await client.login(username, password);
      const results = await getTeamMemberStatistics(teamSlug, competitionSlug, credentials);
      expect(results.length).toBeGreaterThan(0);
    });
  });
});
