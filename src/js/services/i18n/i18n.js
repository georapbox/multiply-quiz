import { storage } from '../storage.js';
import en from './translations/en.json';
import el from './translations/el.json';

export const DEFAULT_LANGUAGE = 'en';

export const languages = {
  en: { name: 'English (EN)', translations: en },
  el: { name: 'Ελληνικά (EL)', translations: el }
};

export const getLanguage = () => {
  return storage.getItem('lang') || DEFAULT_LANGUAGE;
};

export const setLanguage = language => {
  storage.setItem('lang', language);
  document.documentElement.setAttribute('lang', language);
};

export const t = (key, params, language = getLanguage()) => {
  if (!languages[language]) {
    language = DEFAULT_LANGUAGE;
  }

  let translation = languages[language]?.translations[key] || key;

  if (params !== null && typeof params === 'object') {
    for (const [param, value] of Object.entries(params)) {
      translation = translation.replaceAll(`{${param}}`, value);
    }
  }

  return translation;
};
