import { parseKilometrikisaTeamPageStatistics, TeamSeries } from './team-parser';
import { teamPageHtmlMock } from './kilometrikisa-team-page.mocks';
import { KilometrikisaError } from '../../../utils/error-handling';

describe('html-parser', () => {
  describe('team data', () => {
    it('should return all team data from html page with correct units and values', () => {
      const result = parseKilometrikisaTeamPageStatistics(teamPageHtmlMock());
      expect(result).toEqual([
        {
          series: TeamSeries.SMALL,
          seriesPlacement: null,
          distancePerPerson: 300,
          totalDistance: 1234.7,
          daysPerPerson: 26.34,
          totalDays: 358,
          savedGas: 256,
          savedCO2: 98,
        },
      ]);
    });

    it('should throw an error if the parsing failed', () => {
      expect(() => parseKilometrikisaTeamPageStatistics('not valid html')).toThrow(
        KilometrikisaError
      );
    });
  });
});
