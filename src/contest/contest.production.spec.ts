import { getContest, getLatestContest } from './contest';

describe('contests', () => {
  describe('getContest', () => {
    it('should parse contest from given contest page', async () => {
      const contest = await getContest('https://www.kilometrikisa.fi/contests/kilometrikisa-2022/');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete contest.isOpen;
      expect(contest).toEqual({
        contestId: 47,
        name: 'Kilometrikisa 2022',
        startDate: '2022-05-01',
        endDate: '2022-09-22',
        url: 'https://www.kilometrikisa.fi/contests/kilometrikisa-2022/',
      });
    });
  });

  describe('getLatestContest', () => {
    it('should get latest contest data', async () => {
      const contest = await getLatestContest();
      expect(contest).toBeTruthy();
    });
  });
});
