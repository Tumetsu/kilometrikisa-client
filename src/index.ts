import { isSessionValid, login, LoginCredentials, SessionCredentials } from './auth/auth';
import { getTeamMemberStatistics } from './statistics/statistics';
import { getUserContestLogEntries } from './contest-log/contest-log';
export { login, isSessionValid } from './auth/auth';
export { KilometrikisaErrorCode, KilometrikisaError } from './utils/error-handling';
export { getTeamStatistics } from './statistics/statistics';

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

class KilometrikisaSession {
  constructor(private _credentials: SessionCredentials) {}

  /**
   * Fetch statistics of team members belonging to some kilometrikisa team.
   * @param teamSlug  The name of the team in "slugified" format. You can pick the value from team page url on the kilometrikisa website.
   * @param contestSlug The name of the contest in "slugified" format. You can pick the value from team page url on the kilometrikisa website when logged in.
   */
  public getTeamMemberStatistics(teamSlug: string, contestSlug: string) {
    return getTeamMemberStatistics(teamSlug, contestSlug, this._credentials);
  }

  /**
   * Return daily logged data for the user in specified contest in specified year.
   * Note that there seems to be a bug in Kilometrikisa service. If new contest has been created but not started
   * yet, even though we specify different year and contestId, this API will return "0" results for each day.
   * TODO: Investigate this issue again when the next contest starts.
   *
   * @param contestId
   * @param year
   */
  getUserContestLogEntries(contestId: string, year: number) {
    return getUserContestLogEntries(contestId, year, this._credentials);
  }

  /**
   * Check if the given token and session id are still valid.
   */
  public isSessionValid() {
    return isSessionValid(this._credentials);
  }

  /**
   * Valid session credentials for later use or persisting to database.
   */
  public get sessionCredentials() {
    return this._credentials;
  }
}
