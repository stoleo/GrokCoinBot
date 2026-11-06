/* Launch credit cards, drawn in the browser. Nothing is stored anywhere:
   the amount comes from the handle, so the same handle always gets the same card.
   Every design has the amount as the hero, plus our bot art and the sticker head. */

// FNV-1a over the lowercase handle, mixed once more so nearby handles land far apart
const hash = s => { let h = 2166136261; for (const c of s.toLowerCase()) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } h ^= h >>> 15; h = Math.imul(h, 2246822507); h ^= h >>> 13; return h >>> 0; };
// $20..$500, mostly small: [share of people, from, to, step]
const TIERS = [[.70, 20, 50, 5], [.18, 60, 100, 10], [.08, 110, 200, 10], [.03, 210, 350, 10], [.01, 360, 500, 10]];
export const creditFor = handle => {
  const h = hash(handle), r = (h % 10000) / 10000, pick = h >>> 14;
  let acc = 0;
  for (const [share, from, to, step] of TIERS) {
    acc += share;
    if (r < acc) return from + (pick % ((to - from) / step + 1)) * step;
  }
  return 500;
};

export const W = 1200, H = 750;
const C = {ink: '#0a0a0a', paper: '#ffffff', mid: '#8d9096', mint: '#5be38f'};

// bot art from the site: [face centre x, face centre y, zoom] inside each 1600x905 image
const ART = {
  'f1-launch': [.37, .39, 4], 'f2-live': [.44, .36, 3.4], 'f3-wallet': [.32, .22, 4.4], 'f4-fees': [.355, .34, 3.6],
  'f5-dexpaid': [.29, .24, 4.4], 'f6-send': [.47, .28, 4.4], 'f7-nohumans': [.47, .41, 3.6], 'f8-youwatch': [.19, .33, 4.4], 'f9-bearded': [.322, .25, 5],
};
const load = src => { const i = new Image(); i.src = src; return i; };
const head = load('img/logo.svg'), usdcImg = load('img/usdc.png');
const IMG = Object.fromEntries(Object.keys(ART).map(n => [n, load(`img/${n}.jpg`)]));
const NAMES = Object.keys(ART);
// each handle gets its own bot, the same one every time
export const artFor = handle => NAMES[(hash(handle) >>> 8) % NAMES.length];
export const BOTS = NAMES;
// the owner's profile picture (the X photo), loaded once per url; the card draws it when it is there, the first letter until then
const PFP = {};
export const pfpReady = src => {
  if (!src) return Promise.resolve();
  if (!PFP[src]) { const i = new Image(); i.crossOrigin = 'anonymous'; i.src = src; PFP[src] = i; }
  return loaded(PFP[src]);
};
const pfpImg = p => typeof p === 'string' ? (PFP[p] && PFP[p].complete && PFP[p].naturalWidth ? PFP[p] : null) : p || null;
// and its own card design, picked for them (they don't choose)
export const designFor = handle => (hash(handle + '#card') >>> 4) % DESIGNS.length;

// fonts and images must be loaded before the first draw
const loaded = i => i.complete ? 0 : new Promise(r => { i.onload = r; i.onerror = r; });
export const ready = document.fonts.load("700 100px 'Geist'")
  .then(() => Promise.all([document.fonts.load("600 30px 'Geist'"), document.fonts.load("500 30px 'Geist'"), loaded(head), loaded(usdcImg), ...Object.values(IMG).map(loaded)]));

let ctx;
const rr = (x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); };
const font = (size, w = 700, fam = 'Geist') => { ctx.font = `${w} ${size}px '${fam}'`; };
const track = px => { if ('letterSpacing' in ctx) ctx.letterSpacing = px + 'px'; };
const text = (s, x, y, col, size, w = 500, fam = 'Geist', align = 'left') => {
  font(size, w, fam); ctx.fillStyle = col; ctx.textAlign = align; ctx.textBaseline = 'alphabetic'; ctx.fillText(s, x, y);
  return ctx.measureText(s).width;
};
const mono = (s, x, y, col, size = 28, align = 'left') => { track(0); return text(s, x, y, col, size, 500, 'Geist', align); };
// the amount: heavy, tight, as big as the card allows
const amount = (s, x, y, col, size, align = 'left') => { track(-size * .05); const w = text(s, x, y, col, size, 700, 'Geist', align); track(0); return w; };
const amountSize = (s, width, max) => { font(100, 700); track(-5); const k = 100 * width / ctx.measureText(s).width; track(0); return Math.min(max, k); };
const drawHead = (x, y, s, rot = -.2) => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.drawImage(head, -s / 2, -s / 2, s, s); ctx.restore(); };
// image cover-fit into a box, keeping the bot's face at the given point of the box
const art = (name, x, y, w, h, fx = .5, fy = .5, zoom = 1) => {
  const img = IMG[name], [cx, cy] = ART[name];
  const s = Math.max(w / 1600, h / 905) * zoom, iw = 1600 * s, ih = 905 * s;
  let ix = x + w * fx - cx * iw, iy = y + h * fy - cy * ih;
  ix = Math.min(x, Math.max(x + w - iw, ix)); iy = Math.min(y, Math.max(y + h - ih, iy));
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.drawImage(img, ix, iy, iw, ih); ctx.restore();
};
// round bot face, cropped the same way as the faces row on the home page
const face = (name, cx, cy, size) => {
  const [fx, fy, k] = ART[name], w = size * .75 * k, h = w * 905 / 1600;
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, size / 2, 0, Math.PI * 2); ctx.clip();
  ctx.fillStyle = '#1a1a1a'; ctx.fill(); ctx.drawImage(IMG[name], cx - fx * w, cy - fy * h, w, h);
  ctx.restore();
};
// a round bot face on its own canvas, usable as a profile picture (the film's cards use these)
export const botFace = (name, size = 240) => {
  const c = document.createElement('canvas'); c.width = c.height = size;
  const keep = ctx; ctx = c.getContext('2d'); face(name, size / 2, size / 2, size); ctx = keep; return c;
};
// the owner's round picture next to the handle; no picture = the first letter, like the chip in the top bar
const avatar = (p, handle, cx, cy, s, dark) => {
  const img = pfpImg(p);
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, s / 2, 0, Math.PI * 2); ctx.clip();
  ctx.fillStyle = dark ? '#1a1a1a' : C.ink; ctx.fill();
  if (img) ctx.drawImage(img, cx - s / 2, cy - s / 2, s, s);
  else text(handle[0].toUpperCase(), cx, cy + s * .17, dark ? C.paper : C.mint, s * .46, 600, 'Geist', 'center');
  ctx.restore();
  ctx.beginPath(); ctx.arc(cx, cy, s / 2 - 1.5, 0, Math.PI * 2); ctx.lineWidth = 3; ctx.strokeStyle = dark ? 'rgba(255,255,255,.35)' : 'rgba(10,10,10,.22)'; ctx.stroke();
};
// the official USDC logo, centred on x, y
const usdc = (x, y, r) => ctx.drawImage(usdcImg, x - r, y - r, r * 2, r * 2);
// "USDC" with the coin in front of it
const usdcTag = (x, y, col, size = 34) => { usdc(x + size * .55, y - size * .36, size * .55); return text('USDC', x + size * 1.35, y, col, size, 600) + size * 1.35; };
// rounded pill, for labels sitting on top of art
const pill = (s, x, y, {bg = 'rgba(10,10,10,.6)', col = C.paper, size = 26, fam = 'Geist', w = 500, align = 'left', lead} = {}) => {
  track(0); font(size, w, fam);
  const tw = ctx.measureText(s).width, ih = size * 1.9, extra = lead ? size * 1.3 : 0, iw = tw + size * 1.3 + extra;
  const x0 = align === 'right' ? x - iw : x;
  rr(x0, y, iw, ih, ih / 2); ctx.fillStyle = bg; ctx.fill();
  if (lead) lead(x0 + size * .65 + size * .5, y + ih / 2, size);
  font(size, w, fam); ctx.fillStyle = col; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(s, x0 + size * .65 + extra, y + ih / 2 + 1);
  return iw;
};
const brand = (x, y, col, size = 32) => { drawHead(x + size * .55, y - size * .34, size * 1.3); text('Grokie.fun', x + size * 1.4, y, col, size, 600); };
// the amount with "USDC" and the coin right after it, on the same baseline, so they never overlap
const USDC_W = 200;
const fitMoney = (amt, maxW, maxSize) => amountSize('$' + amt, maxW - USDC_W, maxSize);
// "launch credit" sits just above the amount
const money = (amt, x, base, col, size, labelCol) => {
  mono('launch credit', x + 6, base - size * .74 - 28, labelCol, 30);
  const w = amount('$' + amt, x, base, col, size); usdcTag(x + w + 26, base - 8, col, 40);
};
// the owner's picture, then the handle with the whitelist number right next to it: "(pfp) @handle  #230"
// on light cards the number sits in a black pill, on dark cards it is mint
const who = (handle, no, x, y, col, {dark = true, align = 'left', stack = false, pfp} = {}) => {
  const h = '@' + handle, n = no ? '#' + no : '';
  const ps = stack ? 100 : 74, pw = ps + (stack ? 26 : 20);
  track(0); font(40, 500, 'Geist'); const hw = ctx.measureText(h).width;
  font(40, 600); const nw = n ? ctx.measureText(n).width + (dark ? 0 : 40) : 0;
  const gap = n && !stack ? 26 : 0, total = pw + (stack ? Math.max(hw, nw) : hw + gap + nw);
  const x0 = align === 'right' ? x - total : x, tx = x0 + pw, ny = y, hy = stack ? y - 58 : y;
  avatar(pfp, handle, x0 + ps / 2, stack ? y - 37 : y - 13, ps, dark);
  mono(h, tx, hy, col, 40);
  if (!n) return;
  const nx = stack ? tx : tx + hw + gap;
  if (dark) { text(n, nx, ny, C.mint, 40, 600); return; }
  rr(nx, ny - 38, nw, 52, 26); ctx.fillStyle = C.ink; ctx.fill();
  text(n, nx + 20, ny, C.mint, 40, 600);
};

const DESIGNS = [
  // 1 black: the bot art on the right melting into black on the left, the amount over the dark side
  (amt, handle, no, bot, pfp) => {
    ctx.fillStyle = C.ink; ctx.fillRect(0, 0, W, H);
    art(bot, W * .3, 0, W * .7, H, .6, .45, 1.2);
    const g = ctx.createLinearGradient(W * .3, 0, W * .75, 0); g.addColorStop(0, 'rgba(10,10,10,1)'); g.addColorStop(1, 'rgba(10,10,10,0)');
    ctx.fillStyle = g; ctx.fillRect(W * .3, 0, W * .45, H);
    const b = ctx.createLinearGradient(0, H * .55, 0, H); b.addColorStop(0, 'rgba(10,10,10,0)'); b.addColorStop(1, 'rgba(10,10,10,.85)');
    ctx.fillStyle = b; ctx.fillRect(0, 0, W, H);
    drawHead(W - 110, 110, 150, .22);
    brand(64, 100, C.paper);
    money(amt, 56, H - 175, C.paper, fitMoney(amt, W - 120, 290), C.mid);
    who(handle, no, 64, H - 66, C.paper, {pfp});
  },
  // 2 the bot's art fills the card, the amount sits on a dark fade at the bottom
  (amt, handle, no, bot, pfp) => {
    art(bot, 0, 0, W, H, .62, .42, 1.15);
    const g = ctx.createLinearGradient(0, H * .3, 0, H); g.addColorStop(0, 'rgba(10,10,10,0)'); g.addColorStop(1, 'rgba(10,10,10,.94)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    pill('Grokie.fun', 56, 52, {fam: 'Geist', w: 600, size: 28, lead: (x, y, s) => drawHead(x, y, s * 1.2)});
    money(amt, 56, H - 150, C.paper, fitMoney(amt, W * .8, 230), 'rgba(255,255,255,.75)');
    who(handle, no, 60, H - 60, C.paper, {pfp});
  },
  // 3 white: huge black amount, the bot's round face and the sticker head stuck on top like stickers
  (amt, handle, no, bot, pfp) => {
    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, W, H);
    // face sticker with a white edge and a soft shadow
    ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.18)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 12;
    ctx.beginPath(); ctx.arc(W - 230, 230, 165, 0, Math.PI * 2); ctx.fillStyle = C.paper; ctx.fill(); ctx.restore();
    face(bot, W - 230, 230, 300);
    drawHead(W - 380, 350, 140, -.28);
    brand(64, 100, C.ink);
    money(amt, 52, H - 165, C.ink, fitMoney(amt, W * .78, 250), '#666');
    who(handle, no, 64, H - 62, C.ink, {dark: false, pfp});
  },
  // 4 split: the bot art on the left, the amount stacked on black on the right
  (amt, handle, no, bot, pfp) => {
    ctx.fillStyle = C.ink; ctx.fillRect(0, 0, W, H);
    const aw = 500;
    art(bot, 0, 0, aw, H, .5, .45, 1.25);
    drawHead(aw, H - 130, 170, -.18);
    const x = aw + 80, size = fitMoney(amt, W - x - 40, 190);
    brand(x, 100, C.paper, 28);
    money(amt, x - 4, 250 + size * .92, C.paper, size, C.mid);
    who(handle, no, x, H - 62, C.paper, {stack: true, pfp});
  },
  // 5 mint: huge black amount, the bot's round face on the right with a black ring
  (amt, handle, no, bot, pfp) => {
    ctx.fillStyle = C.mint; ctx.fillRect(0, 0, W, H);
    ctx.beginPath(); ctx.arc(W - 250, H - 280, 222, 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill();
    face(bot, W - 250, H - 280, 410);
    drawHead(W - 110, H - 120, 130, .2);
    brand(64, 100, C.ink);
    const size = fitMoney(amt, 700, 230);
    money(amt, 52, 190 + size * .78, C.ink, size, 'rgba(10,10,10,.6)');
    who(handle, no, 64, H - 62, C.ink, {dark: false, pfp});
  },
];
export const DESIGN_COUNT = DESIGNS.length;

// no = whitelist number (left out until we have one); pfp = picture url (see pfpReady) or an image/canvas
export function drawCard(canvas, amt, handle, no, pfp, design = designFor(handle)) {
  ctx = canvas.getContext('2d');
  ctx.save(); ctx.clearRect(0, 0, W, H); rr(0, 0, W, H, 64); ctx.clip();
  DESIGNS[Math.min(design, DESIGNS.length - 1)](amt, handle, no, artFor(handle), pfp);
  ctx.restore(); track(0);
}
