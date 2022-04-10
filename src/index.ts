import { isLoggedIn, login } from './auth/auth';
import { getTeamMemberStatistics } from './statistics/statistics';
export { login, isLoggedIn } from './auth/auth';
export { getTeamStatistics, getTeamMemberStatistics } from './statistics/statistics';

/**
 * An utility API to let user to give login credentials only once and then call methods requiring
 * authentication without credentials.
 * @param username
 * @param password
 */
export async function loggedInClient(username: string, password: string) {
  const credentials = await login(username, password);

  return {
    getTeamMemberStatistics: (teamSlug: string, competitionSlug: string) =>
      getTeamMemberStatistics(teamSlug, competitionSlug, credentials),
    isLoggedIn: () => isLoggedIn(credentials),
  };
}
