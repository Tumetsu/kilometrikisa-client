import { getContestId } from './contest';
import axios from 'axios';
import { KilometrikisaErrorCode } from '../utils/error-handling';

jest.mock('axios');

describe('contests', () => {
  let mockedAxios: jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>;
  });

  describe('getContestId', () => {
    it('should return contest id from given contest page', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: `
        $('#team-search').autocomplete({
					serviceUrl: '/teams/json-search/47/',
					minChars: 2,
			`,
      });

      const contestId = await getContestId(
        'https://www.kilometrikisa.fi/contests/kilometrikisa-2022/'
      );

      expect(contestId).toBe(47);
    });

    it('should throw an error if contestId could not be found from the given url', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: `
        <html>
          No contest id here.
        </html>
			`,
      });

      await expect(
        getContestId('https://www.kilometrikisa.fi/contests/kilometrikisa-wrong-url/')
      ).rejects.toBeKilometrikisaError(KilometrikisaErrorCode.COULD_NOT_GET_CONTEST_ID);
    });
  });
});
