import axios from 'axios';
import { SessionCredentials } from '../auth/auth';
import { parseKilometrikisaTeamPageStatistics } from './html-parser/team-parser/team-parser';
import { parseKilometrikisaTeamMemberStatistics } from './html-parser/team-member-parser/team-member-parser';
import { KilometrikisaError, KilometrikisaErrorCode } from '../utils/error-handling';
import { axiosAuthGuard, getAuthConfig } from '../utils/requests';
import { TEAM_PAGE_URL } from '../utils/urls';

/**
 * Fetch team statistics from Kilometrikisa. Does not need authentication. Returns all statistic tables
 * as separate data-objects. One team page might contain two statistic tables. One for regular cycling and one for
 * electric bikes.
 *
 * @param teamSlug  The name of the team in "slugified" format. You can pick the value from team page url on the kilometrikisa website.
 */
export async function getTeamStatistics(teamSlug: string) {
  try {
    const teamStatisticsPageResponse = await axios.get(TEAM_PAGE_URL + teamSlug);
    return parseKilometrikisaTeamPageStatistics(teamStatisticsPageResponse.data);
  } catch (err) {
    throw new KilometrikisaError(
      KilometrikisaErrorCode.TEAM_STATISTICS_NOT_FOUND,
      `Team ${teamSlug} could not be found.`
    );
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
  credentials: SessionCredentials
) {
  const url = `${TEAM_PAGE_URL}${teamSlug}/${contestSlug}/`;
  try {
    const teamMemberStatisticsPage = await axiosAuthGuard(
      axios.get(url, getAuthConfig(url, credentials))
    );
    return parseKilometrikisaTeamMemberStatistics(teamMemberStatisticsPage.data);
  } catch (err) {
    throw new KilometrikisaError(
      KilometrikisaErrorCode.TEAM_STATISTICS_NOT_FOUND,
      `Team ${teamSlug} for given contest ${contestSlug} could not be found.`
    );
  }
}
