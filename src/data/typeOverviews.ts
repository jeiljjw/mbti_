import en from './typeOverviews.en.json';
import ko from './typeOverviews.ko.json';
import ja from './typeOverviews.ja.json';

export interface TypeOverview {
  overview: string[];
  love: string;
  work: string;
}

type Table = Record<string, TypeOverview>;
const TABLES: Record<string, Table> = {
  en: en as Table,
  ko: ko as Table,
  ja: ja as Table,
};

export const getTypeOverview = (type: string, lang: string): TypeOverview => {
  const code = (type || '').toUpperCase();
  return TABLES[lang]?.[code] || TABLES.en[code];
};
