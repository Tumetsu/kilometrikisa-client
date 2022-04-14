import { getContest } from './contest';

describe('contests', () => {
  describe('getContest', () => {
    it('should parse contest from given contest page', async () => {
      const contest = await getContest('https://www.kilometrikisa.fi/contests/kilometrikisa-2022/');
      expect(contest).toEqual({
        contestId: 47,
        name: 'Kilometrikisa 2022',
        startDate: '2022-05-01',
        endDate: '2022-09-22',
        url: 'https://www.kilometrikisa.fi/contests/kilometrikisa-2022/',
      });
    });
  });
});
