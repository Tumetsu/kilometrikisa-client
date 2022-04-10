import axios from 'axios';
import { LoginCredentials } from '../auth/auth';
import { parseKilometrikisaTeamPageStatistics } from './html-parser/team-parser/team-parser';
import { parseKilometrikisaTeamMemberStatistics } from './html-parser/team-member-parser/team-member-parser';
import { transformAxiosError } from '../utils/error-handling';

const kilometrikisaBaseUrl = 'https://www.kilometrikisa.fi';
const kilometrikisaTeamPageBaseUrl = `${kilometrikisaBaseUrl}/teams/`;

function getAuthConfig(url: string, credentials: LoginCredentials) {
  return {
    headers: {
      Referer: url,
      Cookie: `csrftoken=${credentials.token}; sessionid=${credentials.sessionId};`,
    },
  };
}

/**
 * Fetch team statistics from Kilometrikisa. Does not need authentication.
 * @param teamSlug  The name of the team in "slugified" format. You can pick the value from team page url on the kilometrikisa website.
 */
export async function getTeamStatistics(teamSlug: string) {
  try {
    const teamStatisticsPageResponse = await axios.get(kilometrikisaTeamPageBaseUrl + teamSlug);
    return parseKilometrikisaTeamPageStatistics(teamStatisticsPageResponse.data);
  } catch (err) {
    transformAxiosError(err, 404, `Team ${teamSlug} could not be found.`);
    throw err;
  }
}

/**
 * Fetch statistics of team members belonging to some kilometrikisa team
 * @param teamSlug  The name of the team in "slugified" format. You can pick the value from team page url on the kilometrikisa website.
 * @param competitionSlug The name of the competition in "slugified" format. You can pick the value from team page url on the kilometrikisa website when logged in.
 * @param credentials
 */
export async function getTeamMemberStatistics(
  teamSlug: string,
  competitionSlug: string,
  credentials: LoginCredentials
) {
  const url = `${kilometrikisaTeamPageBaseUrl}${teamSlug}/${competitionSlug}/`;
  try {
    const teamMemberStatisticsPage = await axios.get(url, getAuthConfig(url, credentials));
    return parseKilometrikisaTeamMemberStatistics(teamMemberStatisticsPage.data);
  } catch (err) {
    transformAxiosError(
      err,
      404,
      `Team ${teamSlug} for given competition ${competitionSlug} could not be found.`
    );
    throw err;
  }
}

/**
 * Return daily logged data for the user in specified competition in specified year.
 * Note that there seems to be a bug in Kilometrikisa service. If new competition has been created but not started
 * yet, even though we specify different year and competitionId, this API will return "0" results for each day.
 * TODO: Investigate this issue again when the next competition starts.
 *
 * @param competitionId
 * @param year
 * @param credentials
 */
export async function getUserLogEntries(
  competitionId: string,
  year: number,
  credentials: LoginCredentials
) {
  const start = new Date(year, 1, 1).getTime() / 1000;
  const end = new Date(year, 12, 30).getTime() / 1000;
  const url = `${kilometrikisaBaseUrl}/contest/log_list_json/${competitionId}/?start=${start}&end=${end}`;

  try {
    const response = await axios.get(url, getAuthConfig(url, credentials));
    return response.data.map(({ start, title }: { start: string; title: string }) => ({
      date: start,
      distance: parseFloat(title),
    }));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error('Server responded with an error. Are the competitionId and year valid?');
    }
    throw err;
  }
}
