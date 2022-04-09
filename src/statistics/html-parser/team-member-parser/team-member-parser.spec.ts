import { parseKilometrikisaTeamMemberStatistics } from './team-member-parser';
import { teamMemberPageMock } from './kilometrikisa-team-member-page.mocks';

describe('html-parser', () => {
  describe('team member data', () => {
    it('should return all team member data from html page', () => {
      const result = parseKilometrikisaTeamMemberStatistics(teamMemberPageMock());
      expect(result.length).toBe(3);
    });
  });
});
