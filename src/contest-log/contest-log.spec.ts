import axios from 'axios';
import { incrementContestLog, incrementMinuteContestLog } from './contest-log';
import { DateTime } from 'luxon';

jest.mock('axios');

describe('contest logs', () => {
  let mockedAxios: jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>;
  });

  afterEach(() => {
    mockedAxios.post.mockReset();
  });

  describe('incrementContestLog', () => {
    it('should call API with correct data', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: [
          {
            start: '2022-05-04',
            title: '20.54',
          },
        ],
      });
      mockedAxios.post.mockResolvedValueOnce({});
      const spy = jest.spyOn(mockedAxios, 'post');

      await incrementContestLog(47, '2022-05-04', 10, false, { token: 'abc', sessionId: 'efg' });
      expect(spy.mock.calls[0][1]).toContain('km_amount=30.54'); // 20.54 + 10
    });

    it('should update for current day', async () => {
      const currentDate = DateTime.now().toFormat('YYYY-MM-DD');
      mockedAxios.get.mockResolvedValueOnce({
        data: [
          {
            start: currentDate,
            title: '20.54',
          },
        ],
      });
      mockedAxios.post.mockResolvedValueOnce({});
      const spy = jest.spyOn(mockedAxios, 'post');

      await incrementContestLog(47, currentDate, 10, false, { token: 'abc', sessionId: 'efg' });
      expect(spy.mock.calls[0][1]).toContain('km_amount=30.54'); // 20.54 + 10
    });

    it('should prevent updating for future', async () => {
      jest.useFakeTimers().setSystemTime(new Date('2022-05-05'));

      await expect(
        incrementContestLog(47, '2022-05-10', 10, false, { token: 'abc', sessionId: 'efg' })
      ).rejects.toThrow('Given date is in future');

      jest.useRealTimers();
    });

    it('should raise error if the API does not return dates', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: [],
      });

      await expect(
        incrementContestLog(47, '2022-05-10', 10, false, { token: 'abc', sessionId: 'efg' })
      ).rejects.toThrow(
        'Could not find entry for the given date. Is the given date out of the range of the competition dates?'
      );
    });
  });

  describe('incrementMinuteContestLog', () => {
    it('should call API with correct data', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: [
          {
            start: '2022-05-04',
            hours: '1',
            minutes: '30',
          },
        ],
      });
      mockedAxios.post.mockResolvedValueOnce({});
      const spy = jest.spyOn(mockedAxios, 'post');

      await incrementMinuteContestLog(47, '2022-05-04', 1, 15, false, {
        token: 'abc',
        sessionId: 'efg',
      });
      expect(spy.mock.calls[0][1]).toContain('hours=2&minutes=45');
    });

    // it('should increment hours and minutes correctly');
    // it('should update for current day');
    // it('should prevent updating for future');
    // it('should prevent updating for future');
    // it('should raise error if the API does not return dates');
  });
});
