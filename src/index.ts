import { curlClient } from './utils/curl';
import { KilometrikisaAuth } from './auth/auth';
import { getTeamStatistics } from './statistics/statistics';

const authClient = new KilometrikisaAuth(curlClient);
export default { login: authClient.login, isLoggedIn: authClient.isLoggedIn, getTeamStatistics };
