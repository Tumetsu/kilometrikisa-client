import {
  parseKilometrikisaTeamPageStatistics,
  TeamDataType,
  TeamDataUnits,
  TeamPageParsingError,
} from './html-parser';
import { teamPageHtmlMock } from './kilometrikisa-team-page.mocks';

describe('html-parser', () => {
  describe('team data', () => {
    it('should return all team data from html page with correct units and values', () => {
      const result = parseKilometrikisaTeamPageStatistics(teamPageHtmlMock());
      expect(result).toEqual([
        {
          type: TeamDataType.SMALL_SERIES_PLACEMENT,
          unit: TeamDataUnits.NONE,
          value: undefined,
        },
        {
          type: TeamDataType.DISTANCE_PER_PERSON,
          unit: TeamDataUnits.KM_PER_PERSON,
          value: 300,
        },
        {
          type: TeamDataType.TOTAL_DISTANCE,
          unit: TeamDataUnits.KM,
          value: 1234,
        },
        {
          type: TeamDataType.DAY_AVERAGE_PER_PERSON,
          unit: TeamDataUnits.DAY_PER_PERSON,
          value: 26,
        },
        {
          type: TeamDataType.TOTAL_DAYS,
          unit: TeamDataUnits.NONE,
          value: 358,
        },
        {
          type: TeamDataType.SAVED_GAS,
          unit: TeamDataUnits.LITER,
          value: 256,
        },
        {
          type: TeamDataType.SAVED_CO2,
          unit: TeamDataUnits.KG,
          value: 98,
        },
      ]);
    });

    it('should throw an error if the parsing failed', () => {
      expect(() => parseKilometrikisaTeamPageStatistics('not valid html')).toThrow(
        TeamPageParsingError
      );
    });
  });
});
