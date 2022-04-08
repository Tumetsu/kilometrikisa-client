import { curlClient } from './utils/curl';
import { KilometrikisaAuth } from './auth/auth';

const authClient = new KilometrikisaAuth(curlClient);
export default { login: authClient.login, isLoggedIn: authClient.isLoggedIn };
