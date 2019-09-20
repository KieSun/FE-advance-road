const transformIgnorePatterns = [
  '/dist/',
  'node_modules/[^/]+?/(?!(es|node_modules)/)' // Ignore modules without es dir
]

module.exports = {
  transform: {
    '.(ts|tsx)': 'ts-jest'
  },
  setupFiles: ['./tests/setup.js'],
  testEnvironment: 'jsdom',
  testRegex: `.*\\.test|spec\\.js$`,
  testPathIgnorePatterns: ['/node_modules/', 'example'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    '!components/index.tsx',
    '!components/*/style/index.tsx',
    '!components/style/index.tsx'
  ],
  collectCoverage: true,
  coverageReporters: ['html', 'lcov', 'text-summary'],
  coverageDirectory: './test/coverage',
  transformIgnorePatterns
}
