
import { useEffect } from 'react';
import { LanugaeMap } from '@/constants/language';


export const getLanuage = (): string => {
  // @ts-ignore
  let lang = navigator.language || navigator.userLanguage //常规浏览器和 ie 浏览器
  lang = lang.substr(0, 2)
  console.log('lang123', lang);
  localStorage.setItem('language', lang)
  return lang || 'en'
}

export const useChangeLanguage = (router: any) => {

  useEffect(() => {
    const localStorageLanguage = localStorage.getItem('language')
    //如果localstorage已经存在，不需要自动更新
    if (localStorageLanguage) return
    const lang: string = getLanuage()
    const currentLocale = LanugaeMap.get(lang) || 'en'
    const { asPath, locale, pathname } = router
    console.log('router123', router, '123', { pathname, asPath, lang, locale, '当前获取的语言': currentLocale, '是否更新': !(locale === currentLocale) });
    if (locale === currentLocale) return

    // 缓存进入localstorage
    localStorage.setItem('language',currentLocale)
    console.log('====================================');
    console.log('push123');
    console.log('====================================');
    router.push(`/${locale}/${asPath}`, asPath, { locale: currentLocale })
  }, [router])

}






