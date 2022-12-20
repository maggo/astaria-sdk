module.exports = {
  testEnvironment: 'node',
  moduleNameMapper: {
    '^strategy/(.*)': '<rootDir>/src/strategy/$1',
    '^contracts/(.*)': '<rootDir>/src/contracts/$1',
    '^types/(.*)': '<rootDir>/src/types/$1',
  },
}
