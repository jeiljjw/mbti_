import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationKO from './locales/ko/translation.json';
import translationJA from './locales/ja/translation.json';

export const SUPPORTED_LANGS = ['ko', 'en', 'ja'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: SupportedLang = 'en';

export const isSupportedLang = (v: string | undefined | null): v is SupportedLang =>
  !!v && (SUPPORTED_LANGS as readonly string[]).includes(v);

export const detectInitialLang = (): SupportedLang => {
  try {
    const saved = localStorage.getItem('simplembti-lang');
    if (isSupportedLang(saved)) return saved;
    const nav = (navigator.language || 'en').toLowerCase();
    if (nav.startsWith('ko')) return 'ko';
    if (nav.startsWith('ja')) return 'ja';
    return 'en';
  } catch {
    return 'en';
  }
};

const resources = {
  en: { translation: translationEN },
  ko: { translation: translationKO },
  ja: { translation: translationJA },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: [...SUPPORTED_LANGS],
  interpolation: { escapeValue: false },
});

export default i18n;
