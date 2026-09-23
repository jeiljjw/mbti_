import { describe, it, expect } from 'vitest';
import { getMatchContent } from './matchContent';
import { getGrip, getGrowth, getGrowthForType, getTypeFaqs, getTypeSpotlight } from './typeContent';
import { getTypeDetail } from '../data/typeDetails';
import { getTypeOverview } from '../data/typeOverviews';
import { getBank, getQuestionsForMode, MODE_COUNTS, type TestMode } from '../data/questions';
import en from '../locales/en/translation.json';
import ko from '../locales/ko/translation.json';
import ja from '../locales/ja/translation.json';

const TYPES = ['ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP','ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'];
const LANGS = ['en', 'ko', 'ja'];
const HANGUL = /[\uac00-\ud7af]/;
const KANA = /[\u3040-\u30ff]/;
const LATIN = /[A-Za-z]{4,}/;
const LATIN_ALLOW = /^(ISTJ|ISFJ|INFJ|INTJ|ISTP|ISFP|INFP|INTP|ESTP|ESFP|ENFP|ENTP|ESTJ|ESFJ|ENFJ|ENTJ|MBTI|SimpleMBTI|LINE)$/;

const latinViolations = (s: string): string[] =>
  (s.match(LATIN) || []).flatMap((m) => m.split(/[^A-Za-z]+/)).filter((w) => w.length >= 4 && !LATIN_ALLOW.test(w));

describe('match content (all pairs x langs)', () => {
  it('produces complete sections with no language mixing', () => {
    for (const lang of LANGS) {
      for (let i = 0; i < TYPES.length; i++) {
        for (let j = i; j < TYPES.length; j++) {
          const c = getMatchContent(TYPES[i], TYPES[j], lang);
          expect(c.axes).toHaveLength(4);
          expect(c.strengths.length).toBe(4);
          expect(c.watchouts.length).toBeGreaterThanOrEqual(3);
          expect(c.datingTips).toHaveLength(4);
          expect(c.faqs).toHaveLength(5);
          expect(c.verdictLong.length).toBeGreaterThan(50);
          expect(c.narrative.length).toBeGreaterThan(20);
          expect(c.scoreBreakdown.length).toBeGreaterThan(20);
          const texts = [
            ...c.axes.flatMap((a) => [a.title, a.body, a.tip]),
            ...c.strengths, ...c.watchouts, ...c.datingTips,
            c.verdictLong, ...c.faqs.flatMap((f) => [f.q, f.a]),
          ];
          for (const t of texts) {
            expect(t.length, `${TYPES[i]}x${TYPES[j]}/${lang} empty`).toBeGreaterThan(0);
            if (lang === 'ko') {
              expect(KANA.test(t), `kana in ko: ${t.slice(0, 60)}`).toBe(false);
              expect(latinViolations(t), `latin in ko: ${t.slice(0, 60)}`).toEqual([]);
            }
            if (lang === 'ja') {
              expect(HANGUL.test(t), `hangul in ja: ${t.slice(0, 60)}`).toBe(false);
            }
          }
        }
      }
    }
  });
});

describe('type content (all types x langs)', () => {
  it('detail + overview complete, grip/growth/faqs present, no mixing', () => {
    for (const lang of LANGS) {
      for (const t of TYPES) {
        const d = getTypeDetail(t, lang);
        expect(d.strengths.length).toBe(3);
        expect(d.weaknesses.length).toBe(3);
        expect(d.careers.length).toBeGreaterThanOrEqual(3);
        expect(d.traits.length).toBeGreaterThanOrEqual(4);
        const o = getTypeOverview(t, lang);
        expect(o.overview.length).toBe(2);
        expect(o.love.length).toBeGreaterThan(20);
        expect(o.work.length).toBeGreaterThan(20);
        const g = getGrip(t, lang);
        expect(g.inferior).toMatch(/^(Ni|Ne|Si|Se|Ti|Te|Fi|Fe)$/);
        expect(g.recovery.length).toBeGreaterThan(10);
        expect(getTypeFaqs(t, lang)).toHaveLength(4);
        const texts = [...d.strengths, ...d.weaknesses, ...d.careers, ...d.traits, ...o.overview, o.love, o.work, g.trigger, g.grip, g.recovery];
        for (const s of texts) {
          if (lang === 'ko') {
            expect(KANA.test(s), `kana in ko ${t}: ${s.slice(0, 60)}`).toBe(false);
            expect(latinViolations(s), `latin in ko ${t}: ${s.slice(0, 60)}`).toEqual([]);
          }
          if (lang === 'ja') {
            expect(HANGUL.test(s), `hangul in ja ${t}: ${s.slice(0, 60)}`).toBe(false);
          }
        }
      }
    }
  });

  it('growth tips exist for all groups x langs (+ per-type signature tip)', () => {
    for (const lang of LANGS)
      for (const g of ['NT', 'NF', 'SJ', 'SP']) expect(getGrowth(g, lang)).toHaveLength(3);
    for (const lang of LANGS)
      for (const t of TYPES) {
        const group = ['INTJ', 'INTP', 'ENTJ', 'ENTP'].includes(t) ? 'NT' : ['INFJ', 'INFP', 'ENFJ', 'ENFP'].includes(t) ? 'NF' : ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'].includes(t) ? 'SJ' : 'SP';
        expect(getGrowthForType(t, group, lang)).toHaveLength(4);
        expect(getTypeSpotlight(t, lang).length).toBeGreaterThan(30);
      }
  });
});

describe('question bank', () => {
  it('48 questions per lang, 12 per dimension, balanced directions', () => {
    for (const lang of LANGS) {
      const bank = getBank(lang);
      expect(bank).toHaveLength(48);
      for (const dim of ['EI', 'SN', 'TF', 'JP']) {
        const items = bank.filter((q) => q.dimension === dim);
        expect(items).toHaveLength(12);
        expect(items.filter((q) => q.direction === 1)).toHaveLength(6);
        expect(items.filter((q) => q.direction === -1)).toHaveLength(6);
        for (const q of items) expect(q.text.length).toBeGreaterThan(10);
      }
    }
  });

  it('modes slice balanced counts', () => {
    for (const mode of ['lite', 'standard', 'deep'] as TestMode[]) {
      const qs = getQuestionsForMode('en', mode);
      expect(qs).toHaveLength(MODE_COUNTS[mode]);
      for (const dim of ['EI', 'SN', 'TF', 'JP'])
        expect(qs.filter((q) => q.dimension === dim).length).toBe(MODE_COUNTS[mode] / 4);
    }
  });
});

describe('locale parity', () => {
  const keys = (o: object, prefix = ''): string[] =>
    Object.entries(o).flatMap(([k, v]) =>
      typeof v === 'object' && v !== null && !Array.isArray(v) ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`]);
  it('ko/ja have every en key', () => {
    const enKeys = new Set(keys(en));
    for (const [name, loc] of [['ko', ko], ['ja', ja]] as const) {
      const missing = [...enKeys].filter((k) => {
        let cur: unknown = loc;
        for (const part of k.split('.')) cur = (cur as Record<string, unknown>)?.[part];
        return cur === undefined;
      });
      expect(missing, `${name} missing keys`).toEqual([]);
    }
  });
});
