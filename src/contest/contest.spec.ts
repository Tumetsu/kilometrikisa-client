import { getContest, getLatestContest } from './contest';
import axios from 'axios';
import { KilometrikisaErrorCode } from '../utils/error-handling';

jest.mock('axios');

describe('contests', () => {
  let mockedAxios: jest.Mocked<typeof axios>;

  const mockContestPageHtml = `
    <html>
      <script type="text/javascript">
        $('#team-search').autocomplete({
          serviceUrl: '/teams/json-search/47/',
          minChars: 2})
        </script>
        <body>
        <h3>Kilometrikisa 2021 <span class="contest-date">(01.05.2021 - 20.09.2021)</span></h3>
      </body>
    </html>
  `;

  beforeEach(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>;
  });

  describe('getContest', () => {
    it('should return contest data from given contest page', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: mockContestPageHtml,
      });

      const contest = await getContest('https://www.kilometrikisa.fi/contests/kilometrikisa-2022/');

      expect(contest).toEqual({
        contestId: 47,
        name: 'Kilometrikisa 2021',
        startDate: '2021-05-01',
        endDate: '2021-09-20',
        isOpen: false,
        url: 'https://www.kilometrikisa.fi/contests/kilometrikisa-2022/',
      });
    });

    it('should return isOpen as true if contest is currently open', async () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2021-06-01')); // Date is during the competition

      mockedAxios.get.mockResolvedValueOnce({
        data: mockContestPageHtml,
      });

      const contest = await getContest('https://www.kilometrikisa.fi/contests/kilometrikisa-2022/');
      expect(contest.isOpen).toBe(true);

      jest.useRealTimers();
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

  describe('getLatestContest', () => {
    const mockContestListHtml = `
      <html>
        <body>
          <li class="has-dropdown"><a href="#">Tulokset</a>
            <ul class="dropdown">
              <li><a href="/contests/kilometrikisa-2022/teams/">Kilometrikisa 2022</a></li>
              <li><a href="/contests/talvikilometrikisa-2022/teams/">Talvikilometrikisa 2022</a></li>
            </ul>
          </li>
        </body>
      </html>
    `;

    it('should get latest contest data', async () => {
      mockedAxios.get
        .mockResolvedValueOnce({
          data: mockContestListHtml,
        })
        .mockResolvedValueOnce({
          data: mockContestPageHtml,
        });

      const contest = await getLatestContest();
      expect(contest).toEqual({
        contestId: 47,
        name: 'Kilometrikisa 2021',
        isOpen: false,
        startDate: '2021-05-01',
        endDate: '2021-09-20',
        url: 'https://www.kilometrikisa.fi/contests/kilometrikisa-2022/',
      });
    });

    it('should throw an error if parsing of the contests fails', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: `
        <html>
          No contest list here.
        </html>
			`,
      });

      await expect(getLatestContest()).rejects.toBeKilometrikisaError(
        KilometrikisaErrorCode.COULD_NOT_PARSE_RESPONSE
      );
    });
  });
});
