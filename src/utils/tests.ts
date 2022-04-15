export function getEnvCredentials() {
  return {
    username: process?.env['KILOMETRIKISA_USERNAME'] ?? '',
    password: process?.env['KILOMETRIKISA_PASSWORD'] ?? '',
  };
}
