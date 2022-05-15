import { login, LoginCredentials, SessionCredentials } from './auth/auth';
import { KilometrikisaSession } from './KilometrikisaSession';

export { KilometrikisaErrorCode, KilometrikisaError } from './utils/error-handling';
export { getTeamStatistics, getTeams } from './statistics/statistics';
export {
  getContest,
  getContestByContestSlug,
  getLatestContest,
  getAllContestUrls,
} from './contest/contest';
export { KilometrikisaSession } from './KilometrikisaSession';

// Interfaces
export { LoginCredentials, SessionCredentials } from './auth/auth';
export { KilometrikisaDistanceRecord, KilometrikisaMinuteRecord } from './contest-log/contest-log';
export { TeamStatistics, TeamSeries } from './statistics/html-parser/team-parser/team-parser';
export {
  TeamMemberDistanceStatistics,
  TeamMemberTimeStatistics,
} from './statistics/html-parser/team-member-parser/team-member-parser';
export { Team, Pagination } from './statistics/html-parser/team-list-parser/team-list-parser';
export { TeamListSortCriteria, TeamSortOptions } from './statistics/statistics';
export { Contest } from './contest/contest';

/**
 * Get a client class with API-methods to access Kilometrikisa features which require authentication with user account.
 * You can authenticate either with username and password or with token and sessionId.
 *
 * For general once-off use and first time login you have to use username and password login. For subsequent use you
 * can use session credentials if you save those to database etc. once authenticated. This way you can skip the
 * Kilometrikisa login flow as long as your session credentials are still valid.
 *
 * @param credentials {LoginCredentials | SessionCredentials}
 */
export async function kilometrikisaSession(credentials: LoginCredentials | SessionCredentials) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function isLoginCredentials(obj: any): obj is LoginCredentials {
    return 'username' in obj && 'password' in obj;
  }

  let _credentials: SessionCredentials;

  if (isLoginCredentials(credentials)) {
    _credentials = await login(credentials);
  } else {
    _credentials = credentials;
  }

  return new KilometrikisaSession(_credentials);
}
