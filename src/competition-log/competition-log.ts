import axios from 'axios';
import { LoginCredentials } from '../auth/auth';
import { getAuthConfig } from '../utils/requests';

const kilometrikisaBaseUrl = 'https://www.kilometrikisa.fi';

/**
 * Return daily logged data for the user in specified competition in specified year.
 * Note that there seems to be a bug in Kilometrikisa service. If new competition has been created but not started
 * yet, even though we specify different year and competitionId, this API will return "0" results for each day.
 * TODO: Investigate this issue again when the next competition starts.
 *
 * @param competitionId
 * @param year
 * @param credentials
 */
export async function getUserLogEntries(
  competitionId: string,
  year: number,
  credentials: LoginCredentials
) {
  const start = new Date(year, 1, 1).getTime() / 1000;
  const end = new Date(year, 12, 30).getTime() / 1000;
  const url = `${kilometrikisaBaseUrl}/contest/log_list_json/${competitionId}/?start=${start}&end=${end}`;

  try {
    const response = await axios.get(url, getAuthConfig(url, credentials));
    return response.data.map(({ start, title }: { start: string; title: string }) => ({
      date: start,
      distance: parseFloat(title),
    }));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error('Server responded with an error. Are the competitionId and year valid?');
    }
    throw err;
  }
}
