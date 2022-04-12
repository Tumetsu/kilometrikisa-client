import axios from 'axios';
import { LoginCredentials } from '../auth/auth';
import { parseKilometrikisaTeamPageStatistics } from './html-parser/team-parser/team-parser';
import { parseKilometrikisaTeamMemberStatistics } from './html-parser/team-member-parser/team-member-parser';
import { transformAxiosError } from '../utils/error-handling';
import { getAuthConfig } from '../utils/requests';

const kilometrikisaBaseUrl = 'https://www.kilometrikisa.fi';
const kilometrikisaTeamPageBaseUrl = `${kilometrikisaBaseUrl}/teams/`;

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
 * @param contestSlug The name of the contest in "slugified" format. You can pick the value from team page url on the kilometrikisa website when logged in.
 * @param credentials
 */
export async function getTeamMemberStatistics(
  teamSlug: string,
  contestSlug: string,
  credentials: LoginCredentials
) {
  const url = `${kilometrikisaTeamPageBaseUrl}${teamSlug}/${contestSlug}/`;
  try {
    const teamMemberStatisticsPage = await axios.get(url, getAuthConfig(url, credentials));
    return parseKilometrikisaTeamMemberStatistics(teamMemberStatisticsPage.data);
  } catch (err) {
    transformAxiosError(
      err,
      404,
      `Team ${teamSlug} for given contest ${contestSlug} could not be found.`
    );
    throw err;
  }
}

