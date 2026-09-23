import { SUPPORTED_LANGS, isSupportedLang, type SupportedLang } from '../i18n';

export const SITE_ORIGIN = 'https://www.simplembti.com';

export const normalizeLang = (v: string | undefined | null): SupportedLang => {
  if (isSupportedLang(v)) return v;
  return 'en';
};

export const langPath = (lang: string, path = '/'): string => {
  const l = normalizeLang(lang);
  if (!path.startsWith('/')) path = `/${path}`;
  return `/${l}${path === '/' ? '' : path}`;
};

export const canonicalUrl = (lang: string, path = '/'): string =>
  `${SITE_ORIGIN}${langPath(lang, path)}`;

export const alternateUrls = (path = '/'): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const l of SUPPORTED_LANGS) out[l] = canonicalUrl(l, path);
  return out;
};

/** Strip a leading /ko|/en|/ja prefix. Returns { lang, rest } */
export const splitLangPath = (pathname: string): { lang: SupportedLang | null; rest: string } => {
  const m = pathname.match(/^\/(ko|en|ja)(\/|$)/);
  if (!m) return { lang: null, rest: pathname };
  const rest = pathname.slice(m[0].length - 1) || '/';
  return { lang: m[1] as SupportedLang, rest: rest.startsWith('/') ? rest : `/${rest}` };
};
