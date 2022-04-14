import { getContestId } from './contest';

describe('contests', () => {
  describe('getContestId', () => {
    it('should parse contest id from given contest page', async () => {
      const contestId = await getContestId(
        'https://www.kilometrikisa.fi/contests/kilometrikisa-2022/'
      );
      expect(contestId).toBe(47);
    });
  });
});

