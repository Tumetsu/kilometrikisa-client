/**
 * Error class thrown by the client in different error cases.
 */
export class KilometrikisaError extends Error {
  constructor(public code: KilometrikisaErrorCode, message: string) {
    super(message);
  }
}

/**
 * Error codes thrown by the client in different error cases.
 */
export enum KilometrikisaErrorCode {
  LOGIN_FAILED = 1,
  USER_CONTEST_LOG_NOT_FOUND,
  TEAM_STATISTICS_NOT_FOUND,
  COULD_NOT_PARSE_RESPONSE,
  COULD_NOT_UPDATE_COMPETITION_LOG,
  EXPIRED_SESSION,
  COULD_NOT_GET_CONTEST,
  TEAMS_NOT_FOUND,
  CONTEST_LOG_ENTRY_FOR_DATE_NOT_FOUND,
  CONTEST_LOG_ENTRY_DATE_IN_FUTURE,
}
