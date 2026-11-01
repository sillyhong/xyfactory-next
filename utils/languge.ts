import { useEffect } from 'react';
import type { NextRouter } from 'next/router';
import { LanugaeMap } from '@/constants/language';
import { localeAttributes } from '@/constants/locales';

const LANGUAGE_STORAGE_KEY = 'language';

export function rememberLanguage(locale: string) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
  } catch {
    // Language navigation must still work when browser storage is unavailable.
  }
}

function getStoredLanguage() {
  try {
    const locale = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return locale && localeAttributes[locale] ? locale : null;
  } catch {
    return null;
  }
}

export const getLanuage = (): string => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const browserLanguage = navigator.language || 'en';
  const lang = browserLanguage.slice(0, 2).toLowerCase();
  const normalizedLanguage = LanugaeMap.get(lang) || 'en';

  return normalizedLanguage;
};

export const useChangeLanguage = (router: NextRouter) => {
  const { isReady, locale, defaultLocale, asPath, replace } = router;
  useEffect(() => {
    if (!isReady) {
      return;
    }

    // An explicit localized URL takes precedence over browser preferences.
    const urlLocale = window.location.pathname.split('/')[1];
    if (locale && (locale !== defaultLocale || urlLocale === locale)) {
      rememberLanguage(locale);
      return;
    }

    if (getStoredLanguage()) {
      return;
    }

    const currentLocale = getLanuage();
    rememberLanguage(currentLocale);
    if (locale !== currentLocale) {
      void replace(asPath, asPath, { locale: currentLocale });
    }
  }, [isReady, locale, defaultLocale, asPath, replace]);
};





