/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleNameMapper: {
    '^abi/(.*)': '<rootDir>/src/abi/$1',
    '^strategy/(.*)': '<rootDir>/src/strategy/$1',
    '^types/(.*)': '<rootDir>/src/types/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
