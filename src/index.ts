import { isLoggedIn, login, LoginCredentials, SessionCredentials } from './auth/auth';
import { getTeamMemberStatistics } from './statistics/statistics';
import { getUserLogEntries } from './contest-log/contest-log';
export { login, isLoggedIn } from './auth/auth';
export { KilometrikisaErrorCode, KilometrikisaError } from './utils/error-handling';
export { getTeamStatistics } from './statistics/statistics';

/**
 * Get an object with API-methods to access Kilometrikisa features which require authentication with user account.
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

  return {
    getTeamMemberStatistics: (teamSlug: string, contestSlug: string) =>
      getTeamMemberStatistics(teamSlug, contestSlug, _credentials),
    isLoggedIn: () => isLoggedIn(_credentials),
    getUserLogEntries: (contestId: string, year: number) =>
      getUserLogEntries(contestId, year, _credentials),
    /**
     * Return valid session credentials for later use or saving.
     */
    getSessionCredentials: () => _credentials,
  };
}
