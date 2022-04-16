import { isSessionValid, logout, SessionCredentials } from './auth/auth';
import { getTeamMemberStatistics } from './statistics/statistics';
import { getUserContestLogEntries, updateContestLog } from './contest-log/contest-log';

/**
 * A class which offers API for all requests which require authentication to the
 * Kilometrikisa site.
 */
export class KilometrikisaSession {
  constructor(private credentials: SessionCredentials) {}

  /**
   * Fetch statistics of team members belonging to some kilometrikisa team.
   * @param teamSlug  The name of the team in "slugified" format. You can pick the value from team page url on the kilometrikisa website.
   * @param contestSlug The name of the contest in "slugified" format. You can pick the value from team page url on the kilometrikisa website when logged in.
   */
  public getTeamMemberStatistics(teamSlug: string, contestSlug: string) {
    return getTeamMemberStatistics(teamSlug, contestSlug, this.credentials);
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
    return getUserContestLogEntries(contestId, year, this.credentials);
  }

  /**
   * Update distance of a single date to the Kilometrikisa.
   *
   * @param contestId ContestId of the contest the entry belongs to.
   * @param date Date in form of YYYY-MM-DD.
   * @param distance Distance in kilometers.
   */
  updateContestLog(contestId: number, date: string, distance: number) {
    return updateContestLog(contestId, date, distance, this.credentials);
  }

  /**
   * Check if the given token and session id are still valid.
   */
  public isSessionValid() {
    return isSessionValid(this.credentials);
  }

  /**
   * Log out of the Kilometrikisa. Ends session and invalidates the `SessionCredential`. Further requests
   * require new login with username and password.
   */
  public logout() {
    return logout(this.credentials);
  }

  /**
   * Valid session credentials for later use or persisting to database.
   */
  public get sessionCredentials() {
    return this.credentials;
  }
}
