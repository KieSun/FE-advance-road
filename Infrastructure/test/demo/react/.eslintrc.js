const eslintrc = {
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:jest/recommended'
  ],
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    warnOnUnsupportedTypeScriptVersion: false
  },
  parser: '@typescript-eslint/parser',
  plugins: ['markdown', 'react', 'babel', 'jest', '@typescript-eslint'],
  rules: {
    'no-console': 0,
    'import/no-extraneous-dependencies': 0,
    'func-names': 0,
    'import/no-unresolved': 0,
    'no-return-assign': 0,
    'no-param-reassign': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }]
  }
}

module.exports = eslintrc
