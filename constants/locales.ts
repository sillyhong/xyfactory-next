export const localeAttributes: Record<string, { lang: string; dir: 'ltr' | 'rtl' }> = {
  en: { lang: 'en', dir: 'ltr' },
  zh: { lang: 'zh', dir: 'ltr' },
  spanish: { lang: 'es', dir: 'ltr' },
  arabic: { lang: 'ar', dir: 'rtl' },
};

export function getLocaleAttributes(locale = 'en') {
  return localeAttributes[locale] || localeAttributes.en;
}
