import axios from 'axios';
import qs from 'qs';
import { DateTime } from 'luxon';
import { SessionCredentials } from '../auth/auth';
import { axiosAuthGuard, getAuthConfig } from '../utils/requests';
import { KilometrikisaError, KilometrikisaErrorCode } from '../utils/error-handling';
import {
  CONTEST_LOG,
  CONTEST_LOG_LIST_URL,
  CONTEST_LOG_SAVE_URL,
  CONTEST_MINUTE_LOG_LIST_URL,
  MINUTE_CONTEST_LOG_SAVE_URL,
} from '../utils/urls';

export interface KilometrikisaDistanceRecord {
  date: string;
  distance: number;
}
export interface KilometrikisaMinuteRecord {
  date: string;
  hours: number;
  minutes: number;
}

/**
 * Return daily logged data for the user in specified contest in specified year.
 * Note that there seems to be a bug in Kilometrikisa service. If new contest has been created but not started
 * yet, even though we specify different year and contestId, this API will return "0" results for each day.
 * TODO: Investigate this issue again when the next contest starts.
 *
 * @param contestId
 * @param year
 * @param credentials
 */
export async function getUserContestLogEntries(
  contestId: number,
  year: number,
  credentials: SessionCredentials
): Promise<{ date: string; distance: number }[]> {
  const start = new Date(year, 1, 1).getTime() / 1000;
  const end = new Date(year, 12, 30).getTime() / 1000;
  const url = `${CONTEST_LOG_LIST_URL}${contestId}/?start=${start}&end=${end}`;

  try {
    const response = await axiosAuthGuard(axios.get(url, getAuthConfig(url, credentials)));
    return response.data.map(({ start, title }: { start: string; title: string }) => ({
      date: start,
      distance: parseFloat(title),
    }));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new KilometrikisaError(
        KilometrikisaErrorCode.USER_CONTEST_LOG_NOT_FOUND,
        'Server responded with an error. Are the contestId and year valid?'
      );
    }
    throw err;
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
 * @param credentials
 */
export async function incrementContestLog(
  contestId: number,
  date: string,
  distance: number,
  isEbike: boolean,
  credentials: SessionCredentials
) {
  const existingLogForDate = (await fetchExistingLogForDate(
    contestId,
    'distance',
    date,
    credentials
  )) as KilometrikisaDistanceRecord;
  const incrementedValue = existingLogForDate.distance + distance;
  await updateContestLog(contestId, date, incrementedValue, isEbike, credentials);
}

/**
 * Update contest log of logged in user.
 *
 * @param contestId
 * @param date
 * @param distance
 * @param isEbike
 * @param credentials
 */
export async function updateContestLog(
  contestId: number,
  date: string,
  distance: number,
  isEbike: boolean,
  credentials: SessionCredentials
) {
  const body = qs.stringify({
    contest_id: contestId,
    km_date: date,
    km_amount: distance,
    is_electric: isEbike ? 1 : 0,
    csrfmiddlewaretoken: credentials.token,
  });

  try {
    await axiosAuthGuard(
      axios.post(CONTEST_LOG_SAVE_URL, body, getAuthConfig(CONTEST_LOG, credentials))
    );
    return;
  } catch (err) {
    handleAxiosError(err);
    throw err;
  }
}

/**
 * Update minute contest
 *
 * @param contestId
 * @param date
 * @param hours
 * @param minutes
 * @param isEbike
 * @param credentials
 */
export async function updateMinuteContestLog(
  contestId: number,
  date: string,
  hours: number,
  minutes: number,
  isEbike: boolean,
  credentials: SessionCredentials
) {
  const body = qs.stringify({
    contest_id: contestId,
    date: date,
    hours,
    minutes,
    is_electric: isEbike ? 1 : 0,
    csrfmiddlewaretoken: credentials.token,
  });

  try {
    await axiosAuthGuard(
      axios.post(MINUTE_CONTEST_LOG_SAVE_URL, body, getAuthConfig(CONTEST_LOG, credentials))
    );
    return;
  } catch (err) {
    handleAxiosError(err);
    throw err;
  }
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
 * @param credentials
 */
export async function incrementMinuteContestLog(
  contestId: number,
  date: string,
  // TODO: Use only minutes in the API?
  hours: number,
  minutes: number,
  isEbike: boolean,
  credentials: SessionCredentials
) {
  const existingLogForDate = (await fetchExistingLogForDate(
    contestId,
    'minute',
    date,
    credentials
  )) as KilometrikisaMinuteRecord;

  // TODO: This WONT WORK! User could input something which would result to 3 hours and 75 minutes
  const incrementedHours = existingLogForDate.hours + hours;
  const incrementedMinutes = existingLogForDate.minutes + minutes;
  await updateMinuteContestLog(
    contestId,
    date,
    incrementedHours,
    incrementedMinutes,
    isEbike,
    credentials
  );
}

function handleAxiosError(err: unknown) {
  if (axios.isAxiosError(err)) {
    const { response } = err;

    if (response?.status === 400) {
      throw new KilometrikisaError(
        KilometrikisaErrorCode.COULD_NOT_UPDATE_COMPETITION_LOG,
        response.data.response
      );
    }
    if (response?.status === 404) {
      throw new KilometrikisaError(
        KilometrikisaErrorCode.COULD_NOT_UPDATE_COMPETITION_LOG,
        'Could not find contest log to update. Is contestId correct?'
      );
    }
  }
}

/**
 * Fetch log for a single date and verify that the given parameters make sense
 * and that we actually return something useful for the given date.
 *
 * @param contestId
 * @param logType
 * @param date
 * @param credentials
 */
async function fetchExistingLogForDate(
  contestId: number,
  logType: 'distance' | 'minute',
  date: string,
  credentials: SessionCredentials
): Promise<KilometrikisaDistanceRecord | KilometrikisaMinuteRecord> {
  const start = DateTime.fromISO(date).setZone('Europe/Helsinki');
  const end = start.endOf('day');

  if (start > DateTime.now()) {
    throw new KilometrikisaError(
      KilometrikisaErrorCode.CONTEST_LOG_ENTRY_DATE_IN_FUTURE,
      'Given date is in future.'
    );
  }

  const existingLogForDate = await fetchUserContestLogs(
    contestId,
    logType,
    start.toMillis(),
    end.toMillis(),
    credentials
  );

  if (!existingLogForDate.length) {
    throw new KilometrikisaError(
      KilometrikisaErrorCode.CONTEST_LOG_ENTRY_FOR_DATE_NOT_FOUND,
      'Could not find entry for the given date. Is the given date out of the range of the competition dates?'
    );
  }

  return existingLogForDate[0];
}

/**
 * Fetch minute or distance logs for given time range.
 *
 * @param contestId
 * @param logType
 * @param start
 * @param end
 * @param credentials
 */
async function fetchUserContestLogs(
  contestId: number,
  logType: 'distance' | 'minute',
  start: number,
  end: number,
  credentials: SessionCredentials
): Promise<KilometrikisaDistanceRecord[] | KilometrikisaMinuteRecord[]> {
  const url = `${
    logType === 'minute' ? CONTEST_MINUTE_LOG_LIST_URL : CONTEST_LOG_LIST_URL
  }${contestId}/?start=${Math.floor(start / 1000)}&end=${Math.floor(end / 1000)}`;
  try {
    const response = await axiosAuthGuard(axios.get(url, getAuthConfig(url, credentials)));
    return response.data.map(
      ({
        start,
        title,
        hours,
        minutes,
      }: {
        start: string;
        title: string;
        hours: string;
        minutes: string;
      }) => {
        if (hours !== undefined) {
          return {
            date: start,
            hours: parseInt(hours),
            minutes: parseInt(minutes),
          };
        } else {
          return {
            date: start,
            distance: parseFloat(title),
          };
        }
      }
    );
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new KilometrikisaError(
        KilometrikisaErrorCode.USER_CONTEST_LOG_NOT_FOUND,
        'Server responded with an error. Are the contestId and year valid?'
      );
    }
    throw err;
  }
}
