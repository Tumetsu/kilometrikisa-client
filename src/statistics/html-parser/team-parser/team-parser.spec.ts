import { parseKilometrikisaTeamPageStatistics, TeamPageParsingError } from './team-parser';
import { teamPageHtmlMock } from './kilometrikisa-team-page.mocks';

describe('html-parser', () => {
  describe('team data', () => {
    it('should return all team data from html page with correct units and values', () => {
      const result = parseKilometrikisaTeamPageStatistics(teamPageHtmlMock());
      expect(result).toEqual({
        seriesPlacement: undefined,
        distancePerPerson: 300,
        totalDistance: 1234,
        daysPerPerson: 26,
        totalDays: 358,
        savedGas: 256,
        savedCO2: 98,
      });
    });

    it('should throw an error if the parsing failed', () => {
      expect(() => parseKilometrikisaTeamPageStatistics('not valid html')).toThrow(
        TeamPageParsingError
      );
    });
  });
});
