import axios from 'axios';
import { curlClient } from './utils/curl';
import { KilometrikisaAuth } from './auth/auth';

const authClient = new KilometrikisaAuth(axios, curlClient);
export default { login: authClient.login, isLoggedIn: authClient.isLoggedIn };
