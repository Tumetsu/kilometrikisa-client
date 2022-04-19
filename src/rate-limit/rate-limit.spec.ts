import {
  configureRateLimit,
  requestFullfilledInterceptor,
  requestQueue,
  setupRateLimiter,
} from './rate-limit';

function times(n: number, call: (index: number) => void) {
  return Array(n)
    .fill('1')
    .map((item: string, i: number) => call(i));
}

function requestFullfilled(data: number) {
  requestFullfilledInterceptor({ data });
}

describe('rate limiting', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    setupRateLimiter();
  });

  afterEach(() => {
    // Reset rate limiter back to defaults
    configureRateLimit(10, 1000);
  });

  describe('with axios interceptors', () => {
    it('should at maximum execute ~10 requests at once and wait 1s to send next batch from queue', async () => {
      configureRateLimit(10, 1000);

      expect(requestQueue.length).toBe(0);

      // Simulate intercepting 100 requests
      times(99, requestFullfilled);

      expect(requestQueue.length).toBe(99);

      // Add 20 more
      times(20, requestFullfilled);

      expect(requestQueue.length).toBe(119);

      // Clear from the queue 10
      jest.advanceTimersByTime(1001);

      // There is still 99 request in queue waiting
      expect(requestQueue.length).toBe(99);

      jest.advanceTimersByTime(1001);

      expect(requestQueue.length).toBe(89);

      // Clear from the queue rest
      jest.advanceTimersByTime(9000);

      expect(requestQueue.length).toBe(0);
    });

    it('should execute all requests at once if rate limiting is disabled', async () => {
      configureRateLimit(0);

      expect(requestQueue.length).toBe(0);

      // Simulate intercepting 100 requests
      times(99, requestFullfilled);

      expect(requestQueue.length).toBe(0);
    });
  });
});
