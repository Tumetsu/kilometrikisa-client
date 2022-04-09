import axios from 'axios';
import { LoginCredentials } from '../auth/auth';
import { parseKilometrikisaTeamPageStatistics } from './html-parser/team-parser/team-parser';
import { parseKilometrikisaTeamMemberStatistics } from './html-parser/team-member-parser/team-member-parser';

const kilometrikisaTeamPageBaseUrl = 'https://www.kilometrikisa.fi/teams/';

/**
 * Fetch team statistics from Kilometrikisa. Does not need authentication.
 * @param teamSlug  The name of the team in "slugified" format. You can pick the value from team page url on the kilometrikisa website.
 */
export async function getTeamStatistics(teamSlug: string) {
  const teamStatisticsPageResponse = await axios.get(kilometrikisaTeamPageBaseUrl + teamSlug);
  return parseKilometrikisaTeamPageStatistics(teamStatisticsPageResponse.data);
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
  const teamMemberStatisticsPage = await axios.get(url, {
    headers: {
      Referer: url,
      Cookie: `csrftoken=${credentials.token}; sessionid=${credentials.sessionId};`,
    },
  });

  return parseKilometrikisaTeamMemberStatistics(teamMemberStatisticsPage.data);
}
