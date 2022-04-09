import { getTeamStatistics } from './statistics';

describe('statistics', () => {
  describe('fetch team statistics from production', () => {
    it('should fetch team statistics', async () => {
      const results = await getTeamStatistics('vincit-forza');
      expect(results.length).toBeGreaterThan(0);
    });
  });
});
