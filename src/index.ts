import { KilometrikisaAuth } from './auth/auth';
import { getTeamStatistics, getTeamMemberStatistics } from './statistics/statistics';

const authClient = new KilometrikisaAuth();
export default {
  login: authClient.login.bind(authClient),
  isLoggedIn: authClient.isLoggedIn.bind(authClient),
  getTeamStatistics,
  getTeamMemberStatistics,
};
