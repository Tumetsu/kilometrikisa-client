/**
 * Error class thrown by the client in different error cases.
 */
export class KilometrikisaError extends Error {
  constructor(code: KilometrikisaErrorCode, message: string) {
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
}
