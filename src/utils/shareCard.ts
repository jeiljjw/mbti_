// Renders a 1080x1350 share card PNG for a result type. No dependencies.
const hexA = (hex: string, alpha: number): string => {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
};
export const drawShareCard = async (
  type: string,
  displayName: string,
  keywords: string[],
  lang: string,
  theme: { from: string; to: string } = { from: '#6ee7b7', to: '#a78bfa' }
): Promise<string> => {
  const W = 1080;
  const H = 1350;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas unsupported');

  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#0b1020');
  bg.addColorStop(0.55, '#101a33');
  bg.addColorStop(1, '#0c1f2a');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // theme-tinted top band
  const band = ctx.createLinearGradient(0, 0, W, 0);
  band.addColorStop(0, theme.from);
  band.addColorStop(1, theme.to);
  ctx.fillStyle = band;
  ctx.fillRect(0, 0, W, 18);

  // glow circles
  const glow = (x: number, y: number, r: number, color: string) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, color);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  };
  glow(540, 420, 520, hexA(theme.from, 0.28));
  glow(200, 1150, 420, hexA(theme.to, 0.22));

  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.font = '600 34px system-ui, sans-serif';
  ctx.fillText('SIMPLEMBTI.COM', 540, 150);

  ctx.font = '800 300px system-ui, sans-serif';
  const typeGrad = ctx.createLinearGradient(240, 260, 840, 560);
  typeGrad.addColorStop(0, theme.from);
  typeGrad.addColorStop(1, theme.to);
  ctx.fillStyle = typeGrad;
  ctx.fillText(type, 540, 560);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 64px system-ui, sans-serif';
  ctx.fillText(displayName.slice(0, 24), 540, 680);

  ctx.font = '500 44px system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  keywords.slice(0, 3).forEach((k, i) => {
    ctx.fillText(`✦ ${k}`.slice(0, 26), 540, 790 + i * 70);
  });

  // footer pill
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  const pillW = 640;
  const pillH = 110;
  const pillX = (W - pillW) / 2;
  const pillY = H - 260;
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, 55);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 46px system-ui, sans-serif';
  const cta = lang === 'ko' ? '나의 유형 확인하기' : lang === 'ja' ? '自分のタイプを診断' : 'Find my type';
  ctx.fillText(cta, 540, pillY + 72);

  return canvas.toDataURL('image/png');
};

export const downloadDataUrl = (dataUrl: string, filename: string) => {  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
};

export const shareLinks = (url: string, text: string) => ({
  x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  line: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`,
});
