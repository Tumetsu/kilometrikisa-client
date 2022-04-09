import {
  parseKilometrikisaTeamMemberStatistics,
  TeamMemberStatisticsParsingError,
} from './team-member-parser';
import { teamMemberPageMock } from './kilometrikisa-team-member-page.mocks';

describe('html-parser', () => {
  describe('team member data', () => {
    it('should return all team member data from html page', () => {
      const result = parseKilometrikisaTeamMemberStatistics(teamMemberPageMock());
      expect(result.distanceStatistics).toEqual([
        {
          placement: 1,
          name: 'Testi Testersson',
          email: '',
          totalDistance: 1691,
          distanceByRegularBike: 1691,
          distanceByEbike: 0,
          totalCyclingDays: 43,
        },
        {
          placement: 2,
          name: 'Paula Pyöräilijä',
          email: '',
          totalDistance: 1531,
          distanceByRegularBike: 844,
          distanceByEbike: 687,
          totalCyclingDays: 55,
        },
        {
          placement: 3,
          name: 'Tsygä Tsygäilijä',
          email: '',
          totalDistance: 1513,
          distanceByRegularBike: 1513,
          distanceByEbike: 0,
          totalCyclingDays: 49,
        },
      ]);

      expect(result.timeStatistics).toEqual([
        {
          placement: 1,
          name: 'Testi Testersson',
          email: '',
          time: {
            hours: 79,
            minutes: 43,
          },
          totalCyclingDays: 42,
        },
        {
          placement: 2,
          name: 'Tsygä Tsygäilijä',
          email: '',
          time: {
            hours: 74,
            minutes: 30,
          },
          totalCyclingDays: 49,
        },
        {
          placement: 3,
          name: 'Paula Pyöräilijä',
          email: '',
          time: {
            hours: 54,
            minutes: 0,
          },
          totalCyclingDays: 34,
        },
      ]);
    });

    it('should throw an error if the parsing failed', () => {
      expect(() => parseKilometrikisaTeamMemberStatistics('not valid html')).toThrow(
        TeamMemberStatisticsParsingError
      );
    });
  });
});
