import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { pt, en } from '../const/index';

const options = {
  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  debug: true,

  // lng: 'en',

  resources: {
    'pt-BR': {
      common: pt,
    },
    en: {
      common: en,
    },
  },

  fallbackLng: 'en',

  ns: ['common'],

  defaultNS: 'common',

  react: {
    wait: false,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default',
  },
};

i18n
  .use(LanguageDetector)
  .init(options);

export default i18n;
