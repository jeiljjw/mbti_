// Single source of truth for compatibility scoring.
// Used by scripts/prerender.mjs AND verified against src/utils/compatibility.ts
// by src/utils/score-parity.test.ts. Keep all three in sync.
export const scoreOf = (a, b) => {
  a = a.toUpperCase();
  b = b.toUpperCase();
  if (a === b) return 85;
  let shared = 0;
  for (let i = 0; i < 4; i++) if (a[i] === b[i]) shared++;
  let s = 52 + shared * 9;
  if (a[1] === b[1]) s += 4;
  if (a[2] === b[2]) s += 3;
  if (shared === 0) s -= 4;
  if (a[1] === 'N' && b[1] === 'N' && a[2] !== b[2] && shared <= 2) s += 10;
  return Math.max(38, Math.min(98, s));
};

export const tierOf = (s) => (s >= 82 ? 0 : s >= 68 ? 1 : s >= 55 ? 2 : 3);
