import axios from 'axios';
import { parseKilometrikisaTeamPageStatistics } from './html-parser/html-parser';

const kilometrikisaTeamPageBaseUrl = 'https://www.kilometrikisa.fi/teams/';

/**
 * Fetch team statistics from Kilometrikisa. Does not need authentication.
 * @param teamSlug  The name of the team in "slugified" format. You can pick the value from team page url on the kilometrikisa website.
 */
export async function getTeamStatistics(teamSlug: string) {
  const teamStatisticsPageResponse = await axios.get(kilometrikisaTeamPageBaseUrl + teamSlug);
  return parseKilometrikisaTeamPageStatistics(teamStatisticsPageResponse.data);
}
