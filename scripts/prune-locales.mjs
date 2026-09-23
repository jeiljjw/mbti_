import { readFileSync, writeFileSync } from 'node:fs';

// Drop the legacy 20-question arrays (engine now uses src/data/questions.*.json).
for (const lang of ['en', 'ko', 'ja']) {
  const p = `src/locales/${lang}/translation.json`;
  const d = JSON.parse(readFileSync(p, 'utf8'));
  if (Array.isArray(d.test?.questions)) {
    delete d.test.questions;
    writeFileSync(p, JSON.stringify(d, null, 2));
    console.log(lang, 'questions removed');
  } else {
    console.log(lang, 'already clean');
  }
}
