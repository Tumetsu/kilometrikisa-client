import * as cheerio from 'cheerio';
import axios from 'axios';
import { KilometrikisaError, KilometrikisaErrorCode } from '../utils/error-handling';
import { CONTEST_BASE_URL, KILOMETRIKISA_BASE_URL } from '../utils/urls';

export interface Contest {
  /**
   * Id which identifies contests in API calls.
   */
  contestId: number;
  name: string;
  startDate: string;
  endDate: string;
  url: string;
  /**
   * Last part of the contest url. E.g. `kilometrikisa-2022`.
   */
  slug: string;
  /**
   * Is the competition open currently. Utility property based on `startDate` and `endDate`. Note that it is usually
   * possible to submit entries to Kilometrikisa contest log few days after it has officially closed.
   */
  isOpen: boolean;
}

/**
 * An utility to fetch `Contest` with just contest page's slug.
 *
 * @param contestSlug Slug of the contest from contest page url. For example: `kilometrikisa-2022`
 */
export function getContestByContestSlug(contestSlug: string): Promise<Contest> {
  return getContest(`${CONTEST_BASE_URL}${contestSlug}/`);
}

/**
 * Scrape `Contest` data from given contest page.
 *
 * @param contestUrl Url of a contest-page. For example https://www.kilometrikisa.fi/contests/kilometrikisa-2022/
 */
export async function getContest(contestUrl: string): Promise<Contest> {
  try {
    const response = await axios.get(contestUrl);
    const $ = cheerio.load(response.data);

    return {
      contestId: parseContestId($.html()),
      name: parseContestName($),
      url: contestUrl,
      slug: getSlugFromUrl(contestUrl),
      ...parseContestDates($),
    };
  } catch (err) {
    throw new KilometrikisaError(
      KilometrikisaErrorCode.COULD_NOT_GET_CONTEST,
      `Could not extract contest data from given url. Is ${contestUrl} a valid contest page?`
    );
  }
}

/**
 * Fetch latest `Contest` in Kilometrikisa.
 */
export async function getLatestContest(): Promise<Contest> {
  const allContestUrls = await getAllContestUrls();

  if (!allContestUrls.length) {
    throw new KilometrikisaError(
      KilometrikisaErrorCode.COULD_NOT_PARSE_RESPONSE,
      'Did not found competition urls. Has Kilometrikisa website changed?'
    );
  }

  return await getContest(allContestUrls[0]);
}

/**
 * Returns all contest urls from the kilometrikisa site navigation menu.
 * Consider exposing this method via API to end users.
 */
async function getAllContestUrls() {
  try {
    const response = await axios.get(KILOMETRIKISA_BASE_URL);
    const $ = cheerio.load(response.data);

    const contestList = $('li.has-dropdown a:contains("Tulokset")').next();
    return contestList
      .find('li a')
      .map(function () {
        return `${KILOMETRIKISA_BASE_URL}${$(this).prop('href')}`.replace('/teams/', '/');
      })
      .toArray();
  } catch (err) {
    throw new KilometrikisaError(
      KilometrikisaErrorCode.COULD_NOT_PARSE_RESPONSE,
      'Could not parse all competition urls from the response'
    );
  }
}

function parseContestName($: cheerio.CheerioAPI) {
  return cheerio.load($.html())('.contest-date').parent().children().remove().end().text().trim();
}

function parseContestDates($: cheerio.CheerioAPI) {
  function convertDatesToISODateString(date: string) {
    const [days, months, year] = date.split('.');
    return `${year}-${months}-${days}`;
  }

  const contestDate = $('.contest-date').text();
  const matches = [...contestDate.matchAll(/\d\d\.\d\d\.\d\d\d\d/g)];

  const dates = {
    startDate: convertDatesToISODateString(matches[0][0]),
    endDate: convertDatesToISODateString(matches[1][0]),
  };

  return {
    isOpen: isOpen(dates),
    ...dates,
  };
}

function parseContestId(htmlBody: string) {
  // Override TS null check with as. We want to throw an error if parsing fails
  const matches = htmlBody.match(/\/json-search\/(\d+)/) as RegExpMatchArray;
  return parseInt(matches[1]);
}

function isOpen(dates: { startDate: string; endDate: string }) {
  const { startDate, endDate } = dates;

  const startMs = new Date(startDate).getTime();
  const currentMs = Date.now();
  const endMs = new Date(endDate).getTime();

  return startMs <= currentMs && currentMs <= endMs;
}

function getSlugFromUrl(url: string) {
  const parts = url.split('/').filter(part => part);
  return parts[parts.length - 1];
}
