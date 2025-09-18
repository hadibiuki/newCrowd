module.exports = {
  extends: ['@zarinpal/eslint-config-custom'],
  ignorePatterns: ['graphql'],
  parserOptions: { tsconfigRootDir: './' },
  root: true,
  rules: {
    'import/namespace': 'off',
    'import/no-unresolved': 'off',
  },
};
