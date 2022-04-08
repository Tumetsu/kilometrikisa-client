/**
 * Response from Kilometrikisa api which corresponds a successful curl response which contains
 * sessionid and csrftoken.
 */
export const successfulSubmitResponse = [
  'HTTP/1.1 302 Found\r',
  'Server: nginx\r',
  'Date: Thu, 07 Apr 2022 19:21:01 GMT\r',
  'Content-Type: text/html; charset=utf-8\r',
  'Content-Length: 0\r',
  'Connection: keep-alive\r',
  'Content-Language: fi\r',
  'Expires: Thu, 07 Apr 2022 19:21:01 GMT\r',
  'Vary: Cookie, Accept-Language\r',
  'Location: /accounts/index/\r',
  'Cache-Control: no-cache, no-store, must-revalidate, max-age=0\r',
  'X-Frame-Options: SAMEORIGIN\r',
  'Set-Cookie: csrftoken=somecsrftoken; expires=Thu, 06-Apr-2023 19:21:01 GMT; Max-Age=31449600; Path=/\r',
  'Set-Cookie: sessionid=somesessionid; expires=Thu, 14-Apr-2022 19:21:01 GMT; httponly; Max-Age=604800; Path=/\r',
  'P3P: CP="ALL DSP COR PSAa PSDa OUR NOR ONL UNI COM NAV"\r',
  'Strict-Transport-Security: max-age=31536000; includeSubDomains\r',
  'X-Content-Type-Options: nosniff\r',
  '\r',
  'HTTP/1.1 403 Forbidden\r',
  'Server: nginx\r',
  'Date: Thu, 07 Apr 2022 19:21:01 GMT\r',
  'Content-Type: text/html\r',
  'Content-Length: 1016\r',
  'Connection: keep-alive\r',
  'Vary: Accept-Language, Cookie\r',
  'X-Frame-Options: SAMEORIGIN\r',
  'Content-Language: fi\r',
  'Strict-Transport-Security: max-age=31536000; includeSubDomains\r',
  '\r',
  '',
  '<!DOCTYPE html>',
];

/**
 * A failure response which does not contain token and session id. Shortened real response
 */
export const failureSubmitResponse = [
  'HTTP/1.1 200 OK\r',
  'Server: nginx\r',
  'Date: Thu, 07 Apr 2022 19:41:13 GMT\r',
  'Content-Type: text/html; charset=utf-8\r',
  'Content-Length: 11263\r',
  'Connection: keep-alive\r',
  'Content-Language: fi\r',
  'Expires: Thu, 07 Apr 2022 19:41:13 GMT\r',
  'Vary: Cookie, Accept-Language\r',
  'Cache-Control: no-cache, no-store, must-revalidate, max-age=0\r',
  'X-Frame-Options: SAMEORIGIN\r',
  'Set-Cookie: csrftoken=sometoken; expires=Thu, 06-Apr-2023 19:41:13 GMT; Max-Age=31449600; Path=/\r',
  'P3P: CP="ALL DSP COR PSAa PSDa OUR NOR ONL UNI COM NAV"\r',
  'Strict-Transport-Security: max-age=31536000; includeSubDomains\r',
  'X-Content-Type-Options: nosniff\r',
  '\r',
  '<!DOCTYPE html>',
  '<!--[if IE 8]>',
];

/**
 * Response to the isLoggedIn request when user is logged in.
 */
export const isLoggedInResponse = [
  'HTTP/1.1 200 OK\r',
  'Server: nginx\r',
  'Date: Thu, 07 Apr 2022 19:46:22 GMT\r',
  'Content-Type: text/html; charset=utf-8\r',
  'Content-Length: 14200\r',
  'Connection: keep-alive\r',
  'Vary: Accept-Language, Cookie\r',
  'X-Frame-Options: SAMEORIGIN\r',
  'Content-Language: fi\r',
  'P3P: CP="ALL DSP COR PSAa PSDa OUR NOR ONL UNI COM NAV"\r',
  'Strict-Transport-Security: max-age=31536000; includeSubDomains\r',
  'X-Content-Type-Options: nosniff\r',
  '\r',
  '<!DOCTYPE html>',
  '<!--[if IE 8]>',
  '<html class="no-js lt-ie9" lang="fi"> <![endif]-->',
  '<!--[if gt IE 8]><!-->',
];

/**
 * Response tot he isLoggedIn Rrequest when user is NOT logged in.
 */
export const isNotLoggedInResponse = [
  'HTTP/1.1 302 Found\r',
  'Server: nginx\r',
  'Date: Thu, 07 Apr 2022 19:49:09 GMT\r',
  'Content-Type: text/html; charset=utf-8\r',
  'Content-Length: 0\r',
  'Connection: keep-alive\r',
  'Content-Language: fi\r',
  'Vary: Accept-Language\r',
  'Location: /accounts/login/?next=/accounts/index/\r',
  'X-Frame-Options: SAMEORIGIN\r',
  'Set-Cookie: sessionid=; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/\r',
  'P3P: CP="ALL DSP COR PSAa PSDa OUR NOR ONL UNI COM NAV"\r',
  'Strict-Transport-Security: max-age=31536000; includeSubDomains\r',
  'X-Content-Type-Options: nosniff\r',
  '\r',
  'HTTP/1.1 200 OK\r',
  'Server: nginx\r',
  'Date: Thu, 07 Apr 2022 19:49:09 GMT\r',
  'Content-Type: text/html; charset=utf-8\r',
  'Content-Length: 10987\r',
  'Connection: keep-alive\r',
  'Content-Language: fi\r',
  'Expires: Thu, 07 Apr 2022 19:49:09 GMT\r',
  'Vary: Cookie, Accept-Language\r',
  'Cache-Control: no-cache, no-store, must-revalidate, max-age=0\r',
  'X-Frame-Options: SAMEORIGIN\r',
  'Set-Cookie: csrftoken=fNCro2CFkEJklbfcjVdbGYYiRxPEPFmVjFfge4DPRPsXO0yfZLDKpRgm8ltRwsnO; expires=Thu, 06-Apr-2023 19:49:09 GMT; Max-Age=31449600; Path=/\r',
  'Set-Cookie: sessionid=; expires=Thu, 01-Jan-1970 00:00:00 GMT; Max-Age=0; Path=/\r',
  'P3P: CP="ALL DSP COR PSAa PSDa OUR NOR ONL UNI COM NAV"\r',
  'Strict-Transport-Security: max-age=31536000; includeSubDomains\r',
  'X-Content-Type-Options: nosniff\r',
  '\r',
  '<!DOCTYPE html>',
  '<!--[if IE 8]>',
  '<html class="no-js lt-ie9" lang="fi"> <![endif]-->',
  '<!--[if gt IE 8]><!-->',
];