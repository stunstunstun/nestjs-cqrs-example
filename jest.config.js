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
}