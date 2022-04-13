import { KilometrikisaError, KilometrikisaErrorCode } from './error-handling';

interface CustomMatchers<R = unknown> {
  toBeKilometrikisaError(errorCode: KilometrikisaErrorCode): R;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Expect extends CustomMatchers {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Matchers<R> extends CustomMatchers<R> {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}

interface CustomMatchers<R = unknown> {
  toBeKilometrikisaError(errorCode: KilometrikisaErrorCode): R;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Expect extends CustomMatchers {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Matchers<R> extends CustomMatchers<R> {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}

expect.extend({
  /**
   * Check that the received error object has specific error code.
   * @param received
   * @param errorCode
   */
  toBeKilometrikisaError(received: KilometrikisaError, errorCode: KilometrikisaErrorCode) {
    const pass = received.code === errorCode;
    if (pass) {
      return {
        message: () =>
          `expected errpr ${received} with code ${received.code} to have error code ${errorCode}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected error ${received} with code ${received.code} to have error code ${errorCode}`,
        pass: false,
      };
    }
  },
});

module.exports = {};
