import axios, { AxiosRequestConfig } from 'axios';

let _batchTimeIntervalMs = 1000;
let _maxRequestsPerInterval = 10;
let currentRequests = 0;
let rateLimitEnabled = true;
let queueTimeout: NodeJS.Timeout | null = null;

/**
 * Export request queue for tests.
 */
export const requestQueue: (() => void)[] = [];

/**
 * Configure rate limiting values. By default the client executes at maximum 10 requests / second.
 *
 * If either value is set to 0, rate limiting is disabled. Please be considerate
 * to the service provider if lowering these values from defaults!
 * @param maxRequestsPerInterval
 * @param timeIntervalMs
 */
export function configureRateLimit(maxRequestsPerInterval = 10, timeIntervalMs = 1000) {
  rateLimitEnabled = timeIntervalMs > 0 && maxRequestsPerInterval > 0;
  _batchTimeIntervalMs = timeIntervalMs;
  _maxRequestsPerInterval = maxRequestsPerInterval;
}

/**
 * Setup rate limiting to Axios interceptors.
 */
export function setupRateLimiter() {
  axios.interceptors.request.use(requestFullfilledInterceptor);
}

/**
 * Begin the request queue handler loop.
 */
function startRequestQueue() {
  if (!queueTimeout) {
    queueTimeout = setTimeout(executeRequestBatch, 0);
  }
}

/**
 * Stop the request timeout. Exported so that in tests the rate limit can be cleared
 * properly.
 */
export function stopRequestQueue() {
  if (queueTimeout) {
    clearTimeout(queueTimeout);
    queueTimeout = null;
  }
}

/**
 * Pick request promises from the queue and execute them immediately.
 * Recursively setups a new timeout unless there is no requests in queue and
 * none in the current "time slot". This way the timeout loop does not call itself infinitely
 * for no reason. This is nice since active timeouts prevent program from exiting naturally.
 */
function executeRequestBatch() {
  const nextBatch = requestQueue.splice(0, _maxRequestsPerInterval);
  nextBatch.forEach(r => r());
  currentRequests += nextBatch.length;

  if (currentRequests > 0) {
    queueTimeout = setTimeout(() => {
      currentRequests = 0;
      executeRequestBatch();
    }, _batchTimeIntervalMs);
  } else if (queueTimeout) {
    stopRequestQueue();
  }
}

/**
 * Utility to force the awaiting async-function to wait for its turn until it is let to continue
 * by the timeout.
 */
async function waitInQueue() {
  startRequestQueue();
  return new Promise(resolve => {
    requestQueue.push(() => {
      resolve(true);
    });
  });
}

/**
 * An Axios interceptor which forces the request to wait its turn in queue until it is
 * actually executed.
 *
 * @param config
 */
export async function requestFullfilledInterceptor(config: AxiosRequestConfig) {
  if (rateLimitEnabled) {
    await waitInQueue();
  }
  return config;
}

// Clear timeout on exit
[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach(eventType => {
  process.on(eventType, stopRequestQueue.bind(null, eventType));
});
