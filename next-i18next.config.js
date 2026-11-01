// used for SSR (getServerSideProps)
// const path = require('path')
// const localePath = path.resolve('./public/locales')

module.exports = {
  // https://www.i18next.com/overview/configuration-options#logging
  debug: process.env.NODE_ENV === 'development',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh', 'spanish', 'arabic'],
    // debug: true, //false: 禁止控制台输出日志
  },
  // localePath,
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  // serializeConfig: false,
}
