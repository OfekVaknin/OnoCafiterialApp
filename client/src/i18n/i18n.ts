// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: "he", // default language
    fallbackLng: "he",
    ns: [], // leave empty, load per-component
    defaultNS: false,
    interpolation: { escapeValue: false },
    backend: {
      loadPath: "/locales/{{ns}}/{{lng}}.json",
    },
  });

export default i18n;
