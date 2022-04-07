const curl = require('curlrequest');

const AGENT = 'strava2kilometrikisa-agent';
const CURL_OPTIONS = {
  verbose: true,
  include: true,
  useragent: AGENT,
  location: false, // do not follow header location
};

interface CurlOptions {
  headers: {
    Cookie: string;
  };
}

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
export async function post(url: string, data: unknown, options: CurlOptions): Promise<string[]> {
  const _options = {
    ...CURL_OPTIONS,
    url,
    method: 'POST',
    referer: url,
    data,
    ...options,
  };

  return new Promise((resolve, reject) => {
    curl.request(_options, function (err: unknown, stdout: string) {
      if (err) {
        return reject(err);
      }
      resolve(stdout.split('\n'));
    });
  });
}

/**
 * An utility function to wrap curlrequest get to promise and avoid copy pasting all the constant
 * curl options in every request.
 *
 * Will return array of curl output lines which have to be parsed to get the usable data out of it.
 * @param url
 * @param options
 */
export async function get(url: string, options: CurlOptions): Promise<string[]> {
  const _options = {
    ...CURL_OPTIONS,
    method: 'GET',
    url,
    referer: url,
    ...options,
  };

  return new Promise((resolve, reject) => {
    curl.request(_options, function (err: unknown, stdout: string) {
      if (err) {
        return reject(err);
      }
      resolve(stdout.split('\n'));
    });
  });
}
