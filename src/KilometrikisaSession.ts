import { isSessionValid, logout, SessionCredentials } from './auth/auth';
import { getTeamMemberStatistics } from './statistics/statistics';
import {
  getUserContestLogEntries,
  incrementContestLog,
  incrementMinuteContestLog,
  updateContestLog,
  updateMinuteContestLog,
} from './contest-log/contest-log';

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
  getUserContestLogEntries(contestId: number, year: number) {
    return getUserContestLogEntries(contestId, year, this.credentials);
  }

  /**
   * Update distance of a single date to the Kilometrikisa.
   *
   * @param contestId ContestId of the contest the entry belongs to.
   * @param date Date in form of YYYY-MM-DD.
   * @param distance Distance in kilometers.
   * @param isEbike Should the log be flagged as ebike
   */
  updateContestLog(contestId: number, date: string, distance: number, isEbike = false) {
    return updateContestLog(contestId, date, distance, isEbike, this.credentials);
  }

  /**
   * Increment daily distance for given date. Sums the previously saved distance to the
   * given distance. If `isEbike` is set true, the total distance of the day will be marked
   * as ebike distance. Kilometrikisa has no way to separate ebike and regular bike distance
   * values for single day.
   *
   * @param contestId
   * @param date
   * @param distance
   * @param isEbike
   */
  incrementContestLog(contestId: number, date: string, distance: number, isEbike: boolean) {
    return incrementContestLog(contestId, date, distance, isEbike, this.credentials);
  }

  /**
   * Update minutes and hours of a single date to the Kilometrikisa.
   *
   * @param contestId ContestId of the contest the entry belongs to.
   * @param date Date in form of YYYY-MM-DD.
   * @param hours Hours spent riding at specified date
   * @param minutes Minutes spent riding at specified date
   * @param isEbike Should the log be flagged as ebike
   */
  updateMinuteContestLog(
    contestId: number,
    date: string,
    hours: number,
    minutes: number,
    isEbike = false
  ) {
    return updateMinuteContestLog(contestId, date, hours, minutes, isEbike, this.credentials);
  }

  /**
   * Increment daily minutes for given date. Sums the previously saved duration to the
   * given duration. If `isEbike` is set true, the total duration of the day will be marked
   * as ebike duration. Kilometrikisa has no way to separate ebike and regular bike duration
   * values for single day.
   *
   * @param contestId
   * @param date
   * @param hours
   * @param minutes
   * @param isEbike
   */
  incrementMinuteContestLog(
    contestId: number,
    date: string,
    hours: number,
    minutes: number,
    isEbike: boolean
  ) {
    return incrementMinuteContestLog(contestId, date, hours, minutes, isEbike, this.credentials);
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
