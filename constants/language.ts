
import { i18n, } from 'next-i18next'
// import i18n from 'i18next'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// const { t } = withTranslation('common')
// const label = i18n()
// const test = I18nContext(i18n)
// const newInstance = i18next.createInstance({
//     fallbackLng: 'en',
//     ns: ['common'],
//     defaultNS: 'common',
// });
// i18n.init({ resources: {} });

// setTimeout(() => {
//     console.log('====================================');
//     //   console.log('i18n globalI18n', i18n);
//     // console.log('i18n12312312', i18n);

//     // console.log('i18n newInstance', i18n.init('cmo'))
//     // console.log('i18n newInstance', newInstance)
//     const t = i18n?.getFixedT(null, null, 'nav')
//     // 需要异步
//     console.log('i18n getFixedT test', t('nav_home'))
//     console.log('i18n getFixedT', i18n?.getFixedT(null, null, 'nav.nav_home'))
//     console.log('i18n getFixedT', i18n?.getFixedT(null, null, 'test'))
//     // console.log('i18n getResource', i18n?.getResource('zh','common','nav.nav_home'));
//     // console.log('i18n getResource', i18n?.getResource(null,null,'nav.nav_home'));
// }, 500)
// console.log('i18n', i18n.t('nav.nav_home'));
// const t = i18n?.getFixedT(null, null, 'nav')
// console.log('i18n12312312', t);


export const Languages = (t: any): any => {

    return [
        {
            value: 'en',
            label: t('nav.nav_language.en'),
            prefix: '',
            //参考https://play.google.com/store/apps/details?id=com.google.earth&hl=en
            // 打开控制台搜索hreflang
            hreflang: 'en-US',
        },
        {
            value: 'zh',
            label: t('nav.nav_language.zh'),
            prefix: '/zh',
            hreflang: 'zh'
        },
        {
            value: 'spanish',
            label: t('nav.nav_language.spanish'),
            prefix: '/spanish',
            hreflang: 'es',
        },
        {
            value: 'arabic',
            label: t('nav.nav_language.arabic'),
            prefix: '/arabic',
            hreflang: 'ar',
        },

    ]
}




export const LanugaeMap = new Map([
    ['en', 'en'],
    ['zh', 'zh'],
    ['es', 'spanish'],
    ['ar', 'arabic'],
])
