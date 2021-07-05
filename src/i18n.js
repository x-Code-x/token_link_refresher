// Internalization
import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

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
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
