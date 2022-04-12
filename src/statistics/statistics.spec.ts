import axios from 'axios';
import { getTeamMemberStatistics, getTeamStatistics } from './statistics';

jest.mock('axios');

describe('statistics', () => {
  let mockedAxios: jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>;
  });

  describe('team statistics', () => {
    it('should throw correct correct error if team could not be found', async () => {
      mockedAxios.get.mockRejectedValueOnce({
        response: {
          status: 404,
        },
        isAxiosError: true,
      });

      mockedAxios.isAxiosError.mockReturnValue(true);
      await expect(getTeamStatistics('tiimi')).rejects.toThrow('Team tiimi could not be found');
      mockedAxios.isAxiosError.mockRestore();
    });
  });

  describe('team member statistics', () => {
    it('should throw correct cerror if team could not be found', async () => {
      mockedAxios.get.mockRejectedValueOnce({
        response: {
          status: 404,
        },
        isAxiosError: true,
      });

      mockedAxios.isAxiosError.mockReturnValue(true);
      await expect(
        getTeamMemberStatistics('tiimi', 'kisa', { token: '123', sessionId: '456' })
      ).rejects.toThrow('Team tiimi for given contest kisa could not be found.');
      mockedAxios.isAxiosError.mockRestore();
    });
  });
});
