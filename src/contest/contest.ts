import axios from 'axios';
import { KilometrikisaError, KilometrikisaErrorCode } from '../utils/error-handling';

const contestBaseUrl = 'https://www.kilometrikisa.fi/contests';

/**
 * An utility to fetch contestId with just contest page's slug.
 *
 * @param contestSlug Slug of the contest from contest page url. For example: `kilometrikisa-2022`
 */
export function getContestIdByContestSlug(contestSlug: string) {
  return getContestId(`${contestBaseUrl}/${contestSlug}/`);
}

/**
 * Scrape contestId from given contest page. contestId is internal identifier in the Kilometrikisa site
 * which is required for some other api-calls.
 *
 * @param contestUrl Url of a contest-page. For example https://www.kilometrikisa.fi/contests/kilometrikisa-2022/
 */
export async function getContestId(contestUrl: string) {
  try {
    const response = await axios.get(contestUrl);
    const responseHtml = response.data.toString();

    // The response html contains internal contest id in embedded js-code
    return parseInt(responseHtml.match(/\/json-search\/(\d+)/)[1]);
  } catch (err) {
    throw new KilometrikisaError(
      KilometrikisaErrorCode.COULD_NOT_GET_CONTEST_ID,
      `Could not extract contestId from given url. Is ${contestUrl} a valid contest page?`
    );
  }
}
