const curl = require('curlrequest');

const AGENT = 'strava2kilometrikisa-agent';
const CURL_OPTIONS = {
  verbose: true,
  include: true,
  useragent: AGENT,
  location: false, // do not follow header location
};

export interface Curl {
  get: (url: string, options: CurlOptions) => Promise<string[]>;
  post: (url: string, data: unknown, options: CurlOptions) => Promise<string[]>;
}

export class HttpError extends Error {
  constructor(public statusCode: number) {
    super();
  }
}

interface CurlOptions {
  headers: {
    Cookie: string;
  };
  referer?: string;
}
export const curlClient: Curl = {
  /**
   * An utility function to wrap curlrequest post to promise and avoid copypasting all the constant
   * curl options in every request.
   *
   * Will return array of curl output lines which have to be parsed to get the usable data out of it.
   *
   * @param url
   * @param data
   * @param options
   */
  post: function (url: string, data: unknown, options: CurlOptions): Promise<string[]> {
    const _options = {
      ...CURL_OPTIONS,
      url,
      method: 'POST',
      referer: url,
      data,
      ...options,
    };

    return executeRequest(_options);
  },

  /**
   * An utility function to wrap curlrequest get to promise and avoid copy pasting all the constant
   * curl options in every request.
   *
   * Will return array of curl output lines which have to be parsed to get the usable data out of it.
   * @param url
   * @param options
   */
  get: function (url: string, options: CurlOptions): Promise<string[]> {
    const _options = {
      ...CURL_OPTIONS,
      method: 'GET',
      url,
      referer: url,
      ...options,
    };

    return executeRequest(_options);
  },
};

async function executeRequest(options: Record<string, unknown>): Promise<string[]> {
  const responseRows: string[] = await new Promise((resolve, reject) => {
    curl.request(options, function (err: unknown, stdout: string) {
      if (err) {
        return reject(err);
      }
      resolve(stdout.split('\n'));
    });
  });

  const statusCode = parseStatusCodeFromResponse(responseRows[0]);
  checkStatusCodeState(statusCode);
  return responseRows;
}

function parseStatusCodeFromResponse(line: string) {
  return parseInt(line.match(/HTTP\/1.1 (\d\d\d)/)?.[1] ?? '500');
}

function checkStatusCodeState(statusCode: number) {
  if (statusCode >= 400) {
    throw new HttpError(statusCode);
  }
}
