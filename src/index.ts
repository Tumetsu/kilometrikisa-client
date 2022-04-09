import { curlClient } from './utils/curl';
import { KilometrikisaAuth } from './auth/auth';
import { getTeamStatistics } from './statistics/statistics';

const authClient = new KilometrikisaAuth(curlClient);
export default {
  login: authClient.login.bind(authClient),
  isLoggedIn: authClient.isLoggedIn.bind(authClient),
  getTeamStatistics,
};
