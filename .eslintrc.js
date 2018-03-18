module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    allowImportExportEverywhere: true,
    ecmaVersion: 7,
  },
  env: {
    node: true,
  },
  plugins: [],
  extends: [
    'airbnb-base',
  ],
  rules: {
    'no-underscore-dangle': 'off',
    'import/extensions': 'off',
    'no-console': 'off',
    'function-paren-newline': 'off',
    'react/prop-types': 'off',
    // adds auto-fix stuff as warn
    'comma-dangle': 'warn',
    'semi': 'warn',
    'eol-last': 'warn',
    'quotes': 'warn',
    'no-unused-vars': 'warn',
  }
}
