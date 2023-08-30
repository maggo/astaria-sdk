/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: {
    '^abi/(.*)': '<rootDir>/src/abi/$1',
    '^strategy/(.*)': '<rootDir>/src/strategy/$1',
    '^types/(.*)': '<rootDir>/src/types/$1',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
};
