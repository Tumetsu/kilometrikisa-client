import { parseKilometrikisaTeamMemberStatistics } from './team-member-parser';
import { KilometrikisaError } from '../../../utils/error-handling';
import { teamMemberPageAsCaptainMock } from './team-member-page-as-captain.mocks';
import { teamMemberPageNonCaptainMock } from './team-member-page-as-non-captain.mocks';

describe('html-parser', () => {
  describe('team member data', () => {
    it('should return all team member data from html page', () => {
      const result = parseKilometrikisaTeamMemberStatistics(teamMemberPageAsCaptainMock());
      expect(result.distanceStatistics).toEqual([
        {
          placement: 1,
          name: 'Testi Testersson',
          fullName: 'Testi Testersson',
          email: 'testi.testersson@example.com',
          totalDistance: 1691.9,
          distanceByRegularBike: 1691.9,
          distanceByEbike: 0,
          totalCyclingDays: 43,
        },
        {
          placement: 2,
          name: 'Paula Pyöräilijä',
          fullName: 'Paula Pyöräilijä',
          email: 'paula.pyorailija@example.com',
          totalDistance: 1531.7,
          distanceByRegularBike: 844.6,
          distanceByEbike: 687.2,
          totalCyclingDays: 55,
        },
        {
          placement: 3,
          name: 'Tsygä Tsygäilijä',
          fullName: 'Tytti Fillarinen',
          email: 'tsyga@example.com',
          totalDistance: 1513.3,
          distanceByRegularBike: 1513.3,
          distanceByEbike: 0,
          totalCyclingDays: 49,
        },
      ]);

      expect(result.timeStatistics).toEqual([
        {
          placement: 1,
          name: 'Testi Testersson',
          fullName: 'Testi Testersson',
          email: 'testi.testersson@example.com',
          time: {
            hours: 79,
            minutes: 43,
          },
          totalCyclingDays: 42,
        },
        {
          placement: 2,
          name: 'Tsygä Tsygäilijä',
          fullName: 'Tytti Fillarinen',
          email: 'tsyga@example.com',
          time: {
            hours: 74,
            minutes: 30,
          },
          totalCyclingDays: 49,
        },
        {
          placement: 3,
          name: 'Paula Pyöräilijä',
          fullName: 'Paula Pyöräilijä',
          email: 'paula.pyorailija@example.com',
          time: {
            hours: 54,
            minutes: 0,
          },
          totalCyclingDays: 34,
        },
      ]);
    });

    it('should return all team member data from html page when not as a team captain', () => {
      const result = parseKilometrikisaTeamMemberStatistics(teamMemberPageNonCaptainMock());
      expect(result.distanceStatistics).toEqual([
        {
          placement: 1,
          name: 'Tsygä Tsygäilijä',
          totalDistance: 2060.1,
          distanceByRegularBike: 2060.1,
          distanceByEbike: 0,
          totalCyclingDays: 41,
        },
        {
          placement: 2,
          name: 'Testi Testersson',
          totalDistance: 1344,
          distanceByRegularBike: 1344,
          distanceByEbike: 0,
          totalCyclingDays: 39,
        },
      ]);

      expect(result.timeStatistics).toEqual([
        {
          placement: 1,
          name: 'Tsygä Tsygäilijä',
          time: {
            hours: 97,
            minutes: 14,
          },
          totalCyclingDays: 41,
        },
        {
          placement: 2,
          name: 'Testi Testersson',
          time: {
            hours: 64,
            minutes: 29,
          },
          totalCyclingDays: 39,
        },
      ]);
    });

    it('should throw an error if the parsing failed', () => {
      expect(() => parseKilometrikisaTeamMemberStatistics('not valid html')).toThrow(
        KilometrikisaError
      );
    });
  });
});
