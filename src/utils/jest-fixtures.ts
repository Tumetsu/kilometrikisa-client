import { setupRateLimiter, stopRequestQueue } from '../rate-limit/rate-limit';

beforeAll(() => {
  // Run local tests without rate limiter unless explicitly setup in tests.
  // Use rate limiter in production tests
  if (process.env.RATE_LIMITER) {
    console.log('Setup rate limiting for tests');
    setupRateLimiter();
  }
});

/**
 * Run after all tests have ran.
 */
afterAll(() => {
  // Stop running intervals to prevent Jest from complaining about that
  stopRequestQueue();
});
