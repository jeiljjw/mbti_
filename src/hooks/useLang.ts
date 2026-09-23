import { useParams } from 'react-router-dom';
import { normalizeLang } from '../utils/locale';
import { useTranslation } from 'react-i18next';

/** Returns current lang from URL (:lang param). Falls back to i18n language. */
export const useLang = (): string => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  return normalizeLang(lang || i18n.language);
};

/** Build a lang-prefixed link, e.g. l('/test') => '/ko/test' */
export const useLangLink = () => {
  const lang = useLang();
  return (path = '/'): string => {
    if (!path.startsWith('/')) path = `/${path}`;
    return `/${lang}${path === '/' ? '' : path}`;
  };
};
