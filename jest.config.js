module.exports = {
  moduleNameMapper: {
    '__tests__/(.*)': '<rootDir>/__tests__/$1',
    'src/(.*)': '<rootDir>/src/$1',
  },
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/?(*.)(spec|test).(ts)'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globalSetup: '<rootDir>/__tests__/e2e.setup.ts',
  globalTeardown: '<rootDir>/__tests__/e2e.teardown.ts',
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [2339]
      }
    }
  }
};