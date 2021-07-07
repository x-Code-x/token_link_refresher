// Internalization
import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import translationEn from './locales/en/translation.json';
import homePageEn from './locales/en/homepage.json';
import translationZh from './locales/zh/translation.json';
import homePageZh from './locales/zh/homepage.json';
i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: false,
    lng: 'en',
    fallbackLng: 'en',
    whitelist: ['en', 'zh'],

    saveMissing: true,
    saveMissingTo: 'all',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    backend: {
      lang: {
        en: { homepage: homePageEn, translation: translationEn },
        zh: { homepage: homePageZh, translation: translationZh },
      },
    },

    // loadPath: '/locales/{{lng}}/{{ns}}.json',
  });

export default i18n;
