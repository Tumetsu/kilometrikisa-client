import axios from 'axios';
import { LoginCredentials } from '../auth/auth';
import { parseKilometrikisaTeamPageStatistics } from './html-parser/team-parser/team-parser';
import { parseKilometrikisaTeamMemberStatistics } from './html-parser/team-member-parser/team-member-parser';
import { transformAxiosError } from '../utils/error-handling';

const kilometrikisaTeamPageBaseUrl = 'https://www.kilometrikisa.fi/teams/';

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
    const teamMemberStatisticsPage = await axios.get(url, {
      headers: {
        Referer: url,
        Cookie: `csrftoken=${credentials.token}; sessionid=${credentials.sessionId};`,
      },
    });

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
