import axios from 'axios';
import { SessionCredentials } from '../auth/auth';
import { axiosAuthGuard, getAuthConfig, queryStringify } from '../utils/requests';
import { KilometrikisaError, KilometrikisaErrorCode } from '../utils/error-handling';

const kilometrikisaBaseUrl = 'https://www.kilometrikisa.fi';

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
  contestId: string,
  year: number,
  credentials: SessionCredentials
): Promise<{ date: string; distance: number }[]> {
  const start = new Date(year, 1, 1).getTime() / 1000;
  const end = new Date(year, 12, 30).getTime() / 1000;
  const url = `${kilometrikisaBaseUrl}/contest/log_list_json/${contestId}/?start=${start}&end=${end}`;

  try {
    const response = await axios.get(url, getAuthConfig(url, credentials));
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
}

/**
 * Update contest log of logged in user.
 *
 * @param contestId
 * @param date
 * @param distance
 * @param credentials
 */
export async function updateContestLog(
  contestId: number,
  date: string,
  distance: number,
  credentials: SessionCredentials
) {
  const url = `${kilometrikisaBaseUrl}/contest/log-save/`;
  const body = queryStringify({
    contest_id: contestId,
    km_date: date,
    km_amount: distance,
    csrfmiddlewaretoken: credentials.token,
  });

  try {
    await axiosAuthGuard(axios.post(url, body, getAuthConfig(url, credentials)));
    return;
  } catch (err) {
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
    throw err;
  }
}
