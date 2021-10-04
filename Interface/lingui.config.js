module.exports = {
  catalogs: [
    {
      path: '<rootDir>/locale/{locale}',
      include: ['<rootDir>/src'],
      exclude: ['**/node_modules/**'],
    },
  ],
  compileNamespace: 'cjs',
  extractBabelOptions: {},
  fallbackLocales: {},
  format: 'po',
  sourceLocale: 'en',
  locales: ['en', 'zh-CN'],
  orderBy: 'messageId',
  pseudoLocale: '',
  rootDir: '.',
  runtimeConfigModule: ['@lingui/core', 'i18n'],
}
