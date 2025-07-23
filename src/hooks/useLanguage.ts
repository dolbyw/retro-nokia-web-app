import { useState, useEffect } from 'react';
import { translations, Translations, supportedLanguages } from '../locales';

const LANGUAGE_STORAGE_KEY = 'nokia-language';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return saved && supportedLanguages.includes(saved) ? saved : 'en';
  });

  const [t, setT] = useState<Translations>(translations[currentLanguage]);

  useEffect(() => {
    setT(translations[currentLanguage]);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
  }, [currentLanguage]);

  const changeLanguage = (languageCode: string) => {
    if (supportedLanguages.includes(languageCode)) {
      setCurrentLanguage(languageCode);
    }
  };

  return {
    currentLanguage,
    t,
    changeLanguage,
    supportedLanguages
  };
};