import { getContest } from './contest';
import axios from 'axios';
import { KilometrikisaErrorCode } from '../utils/error-handling';

jest.mock('axios');

describe('contests', () => {
  let mockedAxios: jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>;
  });

  describe('getContest', () => {
    it('should return contest data from given contest page', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: `
        <html>
          <script type="text/javascript">
          $('#team-search').autocomplete({
            serviceUrl: '/teams/json-search/47/',
            minChars: 2})
          </script>
					<body>
					  <h3>Kilometrikisa 2022 <span class="contest-date">(01.05.2022 - 20.09.2022)</span></h3>
          </body>
				</html>
			`,
      });

      const contest = await getContest('https://www.kilometrikisa.fi/contests/kilometrikisa-2022/');

      expect(contest).toEqual({
        contestId: 47,
        name: 'Kilometrikisa 2022',
        startDate: '2022-05-01',
        endDate: '2022-09-20',
        url: 'https://www.kilometrikisa.fi/contests/kilometrikisa-2022/',
      });
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
        getContest('https://www.kilometrikisa.fi/contests/kilometrikisa-wrong-url/')
      ).rejects.toBeKilometrikisaError(KilometrikisaErrorCode.COULD_NOT_GET_CONTEST);
    });
  });
});
