import en from './typeDetails.en.json';
import ko from './typeDetails.ko.json';
import ja from './typeDetails.ja.json';

export interface TypeDetailData {
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  traits: string[];
}

type Table = Record<string, TypeDetailData>;
const TABLES: Record<string, Table> = {
  en: en as Table,
  ko: ko as Table,
  ja: ja as Table,
};

export const getTypeDetail = (type: string, lang: string): TypeDetailData => {
  const code = (type || '').toUpperCase();
  return TABLES[lang]?.[code] || TABLES.en[code];
};
