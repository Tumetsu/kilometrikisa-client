module.exports = {
  preset: 'ts-jest',
  testTimeout: 10000,
  testEnvironment: 'jest-environment-node',
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  transform: {
    '.(ts)': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|js)$',
  moduleFileExtensions: ['ts', 'js'],
  setupFilesAfterEnv: ['./setup-jest.ts'],
};
