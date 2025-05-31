import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import he from './he.json';
import en from './en.json';

const resources = {
  he: { translation: he },
  en: { translation: en },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'he', // default language
    fallbackLng: 'he',
    interpolation: { escapeValue: false },
  });

export default i18n;
