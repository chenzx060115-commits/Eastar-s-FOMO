import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import zhCN from '@/locales/zh-CN.json';
import zhTW from '@/locales/zh-TW.json';
import enUS from '@/locales/en-US.json';

export type Language = 'zh-CN' | 'zh-TW' | 'en-US';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | any;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations: Record<Language, any> = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'en-US': enUS,
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get from localStorage
    const saved = localStorage.getItem('language') as Language;
    if (saved && saved in translations) {
      return saved;
    }
    // Try to detect from browser
    const browserLang = navigator.language;
    if (browserLang.startsWith('zh-Hans') || browserLang === 'zh-CN') {
      return 'zh-CN';
    }
    if (browserLang.startsWith('zh-Hant') || browserLang === 'zh-TW') {
      return 'zh-TW';
    }
    if (browserLang.startsWith('en')) {
      return 'en-US';
    }
    return 'en-US'; // Default
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string | any => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return value !== undefined ? value : key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
