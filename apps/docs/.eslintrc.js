module.exports = {
  extends: ['@zarinpal/eslint-config-custom'],
  root: true,
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'vue/multi-word-component-names': 'off',
  },
};
