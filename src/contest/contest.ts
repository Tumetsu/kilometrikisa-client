import * as cheerio from 'cheerio';
import axios from 'axios';
import { KilometrikisaError, KilometrikisaErrorCode } from '../utils/error-handling';

const contestBaseUrl = 'https://www.kilometrikisa.fi/contests';

export interface Contest {
  contestId: number;
  name: string;
  startDate: string;
  endDate: string;
  url: string;
}
/**
 * An utility to fetch `Contest` with just contest page's slug.
 *
 * @param contestSlug Slug of the contest from contest page url. For example: `kilometrikisa-2022`
 */
export function getContestByContestSlug(contestSlug: string): Promise<Contest> {
  return getContest(`${contestBaseUrl}/${contestSlug}/`);
}

/**
 * Scrape contest data from given contest page.
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
      ...parseContestDates($),
    };
  } catch (err) {
    throw new KilometrikisaError(
      KilometrikisaErrorCode.COULD_NOT_GET_CONTEST,
      `Could not extract contest data from given url. Is ${contestUrl} a valid contest page?`
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

  return {
    startDate: convertDatesToISODateString(matches[0][0]),
    endDate: convertDatesToISODateString(matches[1][0]),
  };
}

function parseContestId(htmlBody: string) {
  // Override TS null check with as. We want to throw an error if parsing fails
  const matches = htmlBody.match(/\/json-search\/(\d+)/) as RegExpMatchArray;
  return parseInt(matches[1]);
}
