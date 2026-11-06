/* Bot cam engine: one character, live, drawn on a canvas next to the chart.
   Everything happens in the viewer's browser: six eyeless pose layers (WebP) come from the edge once, then the engine
   draws the eyes, the mouth, the breathing, the squash and stretch, the pose cross-fades and the voice sync itself.
   Nothing here talks to a server per viewer. 100k viewers = 100k browsers each drawing their own puppet.

   Usage:
     import { BotCam } from './js/botcam.js';
     const cam = new BotCam(container, 'fox', { base: 'parts/' });   // base: where <character>-<pose>.webp and rig.json live
     await cam.ready;
     cam.say('Chart looks great, 30k and dex is paid.', 'https://.../line.mp3', 'hype');   // audio drives the mouth
     cam.say('Just text, timed from the words.', null, 'calm');                              // no audio: timed from the text
     cam.react('hype' | 'sad' | 'point');  cam.sleep();  cam.wake();  cam.activity();
     cam.queue(text, audioUrl, emotion);        // same, but after the current line: for a feed
     cam.unlock();                              // inside a click: lets sound play (the box's first tap does this by itself)
     cam.setVolume(0);  cam.setCharacter('owl');  cam.destroy();

   Events (cam.addEventListener): 'ready', 'say' {text, emotion}, 'end', 'sleep', 'wake', 'audio-blocked', 'audio-unlocked'. */

export const POSES = ['idle', 'talk', 'hype', 'sad', 'point', 'sleepy'];
export const EMOTIONS = ['calm', 'hype', 'smug', 'sad', 'angry', 'sleepy', 'scared'];
const INK = '#0e0e0e';
const ZZZ = 'rgba(213,217,226,.9)';

// How each emotion shapes the puppet: which two poses alternate on syllables, which pose is the accent every few swaps,
// eye proportions (always the same for both eyes), the resting mouth curve (+ smile, - frown), talking rate (syllables
// per second), sway and bob gain.
const EMOTION = {
  calm:   { pair: ['idle', 'talk'],   accent: 'point',  every: 6, eyeW: 1,    eyeH: 1,    curve: .15,  rate: 4,   sway: 1,   bob: 1 },
  hype:   { pair: ['idle', 'talk'],   accent: 'hype',   every: 4, eyeW: 1.05, eyeH: 1.12, curve: .6,   rate: 5,   sway: 1.6, bob: 1.6 },
  smug:   { pair: ['idle', 'talk'],   accent: 'point',  every: 4, eyeW: 1,    eyeH: .72,  curve: .5,   rate: 3.6, sway: 1.1, bob: .9 },
  sad:    { pair: ['idle', 'talk'],   accent: 'sad',    every: 3, eyeW: 1,    eyeH: .82,  curve: -.5,  rate: 3.2, sway: .6,  bob: .6 },
  angry:  { pair: ['idle', 'point'],  accent: 'point',  every: 3, eyeW: 1.08, eyeH: .55,  curve: -.3,  rate: 4.8, sway: 1.4, bob: 1.5 },
  sleepy: { pair: ['sleepy', 'idle'], accent: 'sleepy', every: 3, eyeW: 1,    eyeH: .42,  curve: 0,    rate: 2.6, sway: .5,  bob: .4 },
  scared: { pair: ['idle', 'talk'],   accent: 'sad',    every: 3, eyeW: 1.1,  eyeH: 1.28, curve: -.25, rate: 5.2, sway: 1.8, bob: 1.2 },
};
const BRAND = { logo: 'img/logo.svg', text: 'Grokie.fun' };   // the mark in the top-right corner of every cam
const REACTION = { hype: { pose: 'hype', hold: 1700, hop: true }, sad: { pose: 'sad', hold: 2600 }, point: { pose: 'point', hold: 1500 } };
const POINT_WORDS = /chart|candle|dip|pump|mcap|market cap|number|\d|%|\$|\bk\b/i;

const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const lerp = (a, b, t) => a + (b - a) * t;
const ease = t => t < .5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
const rnd = (a, b) => a + Math.random() * (b - a);

// one rig and one set of bitmaps per character, shared by every cam on the page
const rigs = new Map(), layers = new Map();
export const transferred = { bytes: 0 };
const loadRig = url => {
  if (!rigs.has(url)) rigs.set(url, fetch(url).then(r => { if (!r.ok) throw new Error('rig ' + r.status); return r.json(); }));
  return rigs.get(url);
};
const loadLayer = (base, c, p) => {
  const key = `${base}${c}-${p}`;
  if (!layers.has(key)) layers.set(key, fetch(`${base}${c}-${p}.webp`).then(async r => {
    if (!r.ok) throw new Error(`${c}-${p} ${r.status}`);
    const blob = await r.blob(); transferred.bytes += blob.size;
    return createImageBitmap(blob);
  }));
  return layers.get(key);
};
const loadLayers = (base, c) => Promise.all(POSES.map(p => loadLayer(base, c, p))).then(list => Object.fromEntries(POSES.map((p, i) => [p, list[i]])));

// draw the face features once in image space: shared by the live draw and the still (thumbnails, previews)
const drawFace = (ctx, eyes, mouth, eyeW, o) => {
  ctx.fillStyle = INK;
  for (const [x, y, w, h] of eyes) { ctx.beginPath(); ctx.roundRect(x, y, w, h, w / 2); ctx.fill(); }
  const mw = eyeW * (.9 + .45 * o), mh = eyeW * (.22 + 1.05 * o);
  ctx.beginPath(); ctx.roundRect(mouth[0] - mw / 2, mouth[1] - mh * .25, mw, mh, Math.min(mw, mh) / 2); ctx.fill();
};

/* A still of a character (one pose, eyes open, mouth at rest) on a canvas: for pickers and previews. */
export async function drawStill(canvas, base, character, pose = 'idle') {
  const [rig, img] = await Promise.all([loadRig(base + 'rig.json'), loadLayer(base, character, pose)]);
  const cr = rig.characters[character], p = cr.poses[pose], fr = cr.frame;
  const ctx = canvas.getContext('2d'), W = canvas.width, H = canvas.height;
  const s = Math.min(W * .9 / (fr[2] - fr[0]), H * .9 / (fr[3] - fr[1]));
  ctx.clearRect(0, 0, W, H);
  ctx.save();
  ctx.translate(W / 2, H / 2); ctx.scale(s, s); ctx.translate(-(fr[0] + fr[2]) / 2, -(fr[1] + fr[3]) / 2);
  ctx.drawImage(img, 0, 0, rig.size, rig.size);
  const e = cr.eye || { w: 22, h: 44 };
  const eyes = p.closed ? p.eyes.map(([x, y, w, h]) => [x + w / 2 - e.w / 2, y + h / 2 - e.h / 2, e.w, e.h]) : p.eyes;
  drawFace(ctx, eyes, p.mouth, e.w, 0.04);
  ctx.restore();
}

// text -> syllable schedule [{t, d, a, word}], used when a line has no audio and to place the "point" on a number
const sylCount = w => {
  const s = w.toLowerCase();
  if (/\d/.test(s)) return Math.max(1, Math.round(s.replace(/[^\d]/g, '').length * 1.3));
  const m = s.replace(/[^a-z]/g, '').replace(/e$/, '').match(/[aeiouy]+/g);
  return Math.max(1, m ? m.length : 1);
};
const schedule = (text, rate) => {
  const out = []; let t = 120, idx = 0;
  const words = text.split(/\s+/).filter(Boolean);
  words.forEach((w, wi) => {
    const n = sylCount(w), base = 1000 / rate;
    for (let i = 0; i < n; i++) { const d = base * rnd(.75, 1.25); out.push({ t, d, a: i === 0 ? rnd(.7, 1) : rnd(.45, .8), word: wi, char: idx }); t += d; }
    t += /[.!?]$/.test(w) ? 380 : /[,;:]$/.test(w) ? 170 : 40;
    idx += w.length + 1;
  });
  return { syl: out, end: t + 200, words };
};

let audioCtx = null;
const audio = () => {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
};
// a scratch canvas for the pose cross-fade (see draw): shared by every cam on the page
let mix = null;

/* The character names the rig knows, in the rig's order (alphabetical): the one list every page should use. */
export const characters = base => loadRig(base + 'rig.json').then(rig => Object.keys(rig.characters));

/* Warm the cache for a character before its cam is shown (the coin list, a hover). */
export const preload = (base, character) => Promise.all([loadRig(base + 'rig.json'), loadLayers(base, character)]).then(() => true);

export class BotCam extends EventTarget {
  constructor(container, character, opts = {}) {
    super();
    this.el = container;
    this.opts = Object.assign({ base: 'parts/', rig: null, fit: .9, sleepAfter: 2 * 3600e3, chartSide: 'left', maxDpr: 2, brand: BRAND, volume: 1, unlockOnClick: true }, opts);
    this.volume = this.opts.volume; this.gain = null; this.audioReady = false; this.pending = [];
    // browsers refuse sound before a gesture: the first tap or click on the box unlocks it (the page may also call unlock())
    this.onDown = () => this.unlock();
    if (this.opts.unlockOnClick) container.addEventListener('pointerdown', this.onDown);
    this.reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.opts.brand) { this.logo = new Image(); this.logo.src = this.opts.brand.logo; }
    this.canvas = document.createElement('canvas');
    Object.assign(this.canvas.style, { display: 'block', width: '100%', height: '100%' });
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    this.w = 0; this.h = 0; this.dpr = 1;
    this.now = performance.now(); this.t0 = this.now;
    // puppet state
    this.pose = 'idle'; this.prevPose = 'idle'; this.fadeAt = -1e9; this.fadeMs = 120;
    this.sq = 0; this.sqV = 0;                      // squash spring (scaleY offset)
    this.hopAt = -1e9;
    this.blinkAt = this.now + rnd(1500, 4000); this.blinkStart = -1e9; this.blinkTwice = false;
    this.lookAt = this.now + rnd(2000, 5000); this.lookStart = -1e9; this.look = [0, 0]; this.lookFrom = [0, 0]; this.lookTo = [0, 0];
    this.emotion = EMOTION.calm; this.emotionName = 'calm';
    this.eyeSq = [1, 1]; this.mouth = 0; this.env = 0; this.peak = .05; this.above = false;
    this.speech = null; this.reaction = null; this.asleep = false;
    this.lastSwap = 0; this.swapCount = 0; this.swapSign = 1;
    this.lastActivity = Date.now();
    this.zzz = [];
    this.visible = true; this.raf = 0; this.dead = false;
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(container);
    this.io = new IntersectionObserver(e => { this.visible = e[0].isIntersecting; this.loop(); }, { threshold: 0 });
    this.io.observe(container);
    this.onVis = () => this.loop();
    document.addEventListener('visibilitychange', this.onVis);
    this.ready = this.setCharacter(character);
    this.resize();
  }

  // ---------- loading ----------
  async setCharacter(id) {
    const rigUrl = this.opts.rig || this.opts.base + 'rig.json';
    const [rig, imgs] = await Promise.all([loadRig(rigUrl), loadLayers(this.opts.base, id)]);
    if (this.dead) return;
    const cr = rig.characters[id];
    if (!cr) throw new Error('no rig for ' + id);
    this.character = id; this.rig = cr; this.imgs = imgs; this.size = rig.size;
    const e = cr.eye || { w: 22, h: 44 };
    this.eyeW = e.w; this.eyeH = e.h;
    if (!this.loaded) { this.loaded = true; this.dispatchEvent(new CustomEvent('ready')); }
    else this.swapTo(this.pose, true);
    this.loop();
  }

  resize() {
    const r = this.el.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, this.opts.maxDpr);
    if (r.width === this.w && r.height === this.h && dpr === this.dpr) return;
    this.w = r.width; this.h = r.height; this.dpr = dpr;
    this.canvas.width = Math.round(r.width * dpr); this.canvas.height = Math.round(r.height * dpr);
    this.draw();
  }

  /* Resume the AudioContext. Must run inside a user gesture (click, tap, key). Resolves true when sound can play. */
  async unlock() {
    try {
      const ctx = audio();
      if (ctx.state !== 'running') await ctx.resume();
      this.audioReady = ctx.state === 'running';
    } catch (e) { this.audioReady = false; }
    if (this.audioReady) { this.dispatchEvent(new CustomEvent('audio-unlocked')); if (this.opts.unlockOnClick) this.el.removeEventListener('pointerdown', this.onDown); }
    return this.audioReady;
  }

  /* A MediaStream of the cam (canvas frames plus the voice), for a clip recorded in the browser with MediaRecorder.
     No server is involved: the viewer's own machine encodes it. */
  captureStream(fps = 30) {
    const stream = this.canvas.captureStream(fps);
    try {
      const ctx = audio();
      if (!this.gain) { this.gain = ctx.createGain(); this.gain.gain.value = this.volume; this.gain.connect(ctx.destination); }
      if (!this.recDest) { this.recDest = ctx.createMediaStreamDestination(); this.gain.connect(this.recDest); }
      for (const t of this.recDest.stream.getAudioTracks()) stream.addTrack(t);
    } catch (e) { /* no audio context yet: video only */ }
    return stream;
  }

  /* Like say(), but waits for the current line (and earlier queued ones) to finish. For a feed of lines. */
  queue(text, audioUrl, emotion) {
    return new Promise(resolve => {
      this.pending.push({ text, audioUrl, emotion, resolve });
      if (!this.speech && this.pending.length === 1) this.next();
    });
  }
  next() {
    const n = this.pending.shift(); if (!n) return;
    this.say(n.text, n.audioUrl, n.emotion).then(() => { n.resolve(); if (!this.dead) this.next(); });
  }

  destroy() {
    this.dead = true; this.pending = []; this.stopTalking();
    this.el.removeEventListener('pointerdown', this.onDown);
    cancelAnimationFrame(this.raf); this.ro.disconnect(); this.io.disconnect();
    document.removeEventListener('visibilitychange', this.onVis);
    this.canvas.remove();
  }

  // ---------- public controls ----------
  setEmotion(name) { this.emotion = EMOTION[name] || EMOTION.calm; this.emotionName = EMOTION[name] ? name : 'calm'; }
  // 0 = silent (the mouth still follows the line), 1 = full; the coin page's sound toggle
  setVolume(v) { this.volume = clamp(v, 0, 1); if (this.gain) this.gain.gain.setTargetAtTime(this.volume, this.gain.context.currentTime, .02); }
  activity() { this.lastActivity = Date.now(); if (this.asleep) this.wake(); }

  react(kind) {
    const r = REACTION[kind]; if (!r) return;
    this.activity();
    this.reaction = { pose: r.pose, until: this.now + r.hold };
    this.swapTo(r.pose);
    if (r.hop) this.hopAt = this.now;
  }

  sleep() {
    if (this.asleep) return;
    this.stopTalking(); this.asleep = true; this.reaction = null;
    this.swapTo('sleepy'); this.zzz = []; this.zzzAt = this.now;
    this.dispatchEvent(new CustomEvent('sleep'));
  }
  wake() {
    if (!this.asleep) return;
    this.asleep = false; this.lastActivity = Date.now();
    this.swapTo('idle'); this.sqV -= 1.1; this.blinkAt = this.now + 300; this.blinkTwice = true;
    this.dispatchEvent(new CustomEvent('wake'));
  }

  /* Say a line. audioUrl: the rendered voice (mp3/wav/ogg) -> Web Audio envelope drives the mouth and the pose swaps.
     No audio: the mouth is timed from the text. opts.driven: the caller owns the clock (e.g. the demo's SpeechSynthesis):
     the text schedule starts, cam.beat(wordIndex) re-aligns it on word boundaries, cam.stopTalking() ends it. */
  async say(text, audioUrl, emotion = 'calm', opts = {}) {
    this.stopTalking();
    this.activity();
    this.setEmotion(emotion);
    const rate = this.emotion.rate;
    const sch = schedule(text, rate);
    const m = text.match(POINT_WORDS);
    const pointWord = m ? text.slice(0, m.index).split(/\s+/).filter(Boolean).length : -1;
    const sp = this.speech = { text, sch, i: 0, start: this.now, offset: 0, driven: !!opts.driven, source: null, analyser: null, buf: null, pointWord, pointed: false, node: null };
    this.dispatchEvent(new CustomEvent('say', { detail: { text, emotion: this.emotionName } }));
    if (audioUrl) {
      try {
        const ctx = audio();
        if (ctx.state !== 'running') { try { await ctx.resume(); } catch (e) { /* needs a gesture */ } }
        if (ctx.state !== 'running') throw new Error('sound locked: no user gesture yet');
        this.audioReady = true;
        const res = await fetch(audioUrl); if (!res.ok) throw new Error('audio ' + res.status);
        if (res.status === 204) { if (this.speech === sp) { sp.start = this.now; sp.source = null; } return; }   // past the voiced cap: text only, no fuss
        // the bot's voice settings ride on the response: x-speed (0.7..1.3, already times the emotion) and x-pitch (-1..1).
        // Web Audio ties pitch to rate on a buffer source, so pitch is a detune of up to 4 semitones and slightly changes the length too
        const speed = clamp(parseFloat(res.headers.get('x-speed')) || 1, .5, 2), pitch = clamp(parseFloat(res.headers.get('x-pitch')) || 0, -1, 1);
        const data = await ctx.decodeAudioData(await res.arrayBuffer());
        if (this.speech !== sp) return;
        const src = ctx.createBufferSource(); src.buffer = data;
        src.playbackRate.value = speed; src.detune.value = pitch * 400;
        const rate = speed * Math.pow(2, pitch * 400 / 1200);
        const an = ctx.createAnalyser(); an.fftSize = 1024; an.smoothingTimeConstant = .2;
        if (!this.gain) { this.gain = ctx.createGain(); this.gain.connect(ctx.destination); }
        this.gain.gain.value = this.volume;
        src.connect(an); an.connect(this.gain);                     // the analyser reads the line before the volume, so muted still moves the mouth
        sp.source = src; sp.analyser = an; sp.buf = new Float32Array(an.fftSize); sp.duration = data.duration * 1000 / rate;
        sp.start = this.now; this.peak = .05;
        src.onended = () => { if (this.speech === sp) this.stopTalking(); };
        src.start();
      } catch (err) {
        // no sound (autoplay blocked, bad url): keep the puppet talking from the text so the stream never freezes
        this.dispatchEvent(new CustomEvent('audio-blocked', { detail: { error: String(err) } }));
        if (this.speech === sp) { sp.start = this.now; sp.source = null; }
      }
    }
    return new Promise(res => { sp.resolve = res; });
  }

  // the caller's clock says word `wi` starts now (SpeechSynthesis onboundary); re-align the text schedule to it
  beat(wi) {
    const sp = this.speech; if (!sp || sp.source) return;
    const k = sp.sch.syl.findIndex(s => s.word === wi);
    if (k < 0) return;
    sp.offset = sp.sch.syl[k].t - (this.now - sp.start);
    sp.i = k; this.onSyllable(sp.sch.syl[k]);
  }

  stopTalking() {
    const sp = this.speech; if (!sp) return;
    this.speech = null;
    try { sp.source && sp.source.stop(); } catch (e) { /* already stopped */ }
    this.env = 0;
    if (this.reaction && this.reaction.until > this.now) { /* let the reaction finish */ }
    else this.swapTo(this.asleep ? 'sleepy' : this.emotionName === 'sad' ? 'sad' : 'idle');
    if (this.emotionName === 'sad' && !this.asleep) this.reaction = { pose: 'sad', until: this.now + 1200 };
    sp.resolve && sp.resolve();
    this.dispatchEvent(new CustomEvent('end'));
  }

  // ---------- internals ----------
  swapTo(pose, hard, bounce = .7, ms = 140) {
    if (!this.imgs) return;
    if (pose === this.pose && !hard) return;
    this.prevPose = this.pose; this.pose = pose; this.fadeAt = this.now; this.fadeMs = hard ? 1 : ms;
    if (!hard) this.sqV -= bounce;                     // the small vertical bounce that goes with every change of pose
  }

  onSyllable(s) {
    const now = this.now, em = this.emotion;
    this.swapSign = -this.swapSign;
    if (this.reaction && this.reaction.until > now) return;
    if (now - this.lastSwap < 240) return;
    if (Math.random() < .35 && now - this.lastSwap < 700) return;   // not a metronome: skip some beats
    this.swapCount++;
    const next = this.swapCount % em.every === 0 ? em.accent : (this.pose === em.pair[0] ? em.pair[1] : em.pair[0]);
    this.lastSwap = now; this.swapTo(next, false, .3, 100);
  }

  loop() {
    cancelAnimationFrame(this.raf);
    if (this.dead || !this.visible || document.visibilityState === 'hidden') return;
    const tick = () => { this.raf = requestAnimationFrame(tick); this.step(); this.draw(); };
    this.raf = requestAnimationFrame(tick);
  }

  step() {
    const now = performance.now();
    const dt = clamp((now - this.now) / 1000, 0, 1 / 30);
    this.now = now;
    const em = this.emotion;
    // sleep after a long silence
    if (!this.asleep && Date.now() - this.lastActivity > this.opts.sleepAfter) this.sleep();
    // reaction over -> back to talking pair or rest
    if (this.reaction && now > this.reaction.until) {
      this.reaction = null;
      this.swapTo(this.asleep ? 'sleepy' : this.speech ? em.pair[0] : 'idle');
    }
    // voice envelope
    let target = 0;
    const sp = this.speech;
    if (sp) {
      if (sp.analyser) {
        sp.analyser.getFloatTimeDomainData(sp.buf);
        let sum = 0; for (let i = 0; i < sp.buf.length; i++) sum += sp.buf[i] * sp.buf[i];
        const rms = Math.sqrt(sum / sp.buf.length);
        this.peak = Math.max(this.peak * (1 - dt * .4), rms, .03);
        const o = clamp(rms / this.peak, 0, 1);
        target = o < .08 ? 0 : o ** .8;
        if (!this.above && o > .45) { this.above = true; this.onSyllable(); }
        else if (this.above && o < .25) this.above = false;
        const elapsed = now - sp.start;
        if (sp.pointWord >= 0 && !sp.pointed && elapsed > sp.duration * (sp.sch.syl.find(s => s.word === sp.pointWord) || { t: 0 }).t / sp.sch.end) { sp.pointed = true; this.react('point'); }
      } else {
        const t = now - sp.start + sp.offset;
        const syl = sp.sch.syl;
        while (sp.i < syl.length && t > syl[sp.i].t + syl[sp.i].d) sp.i++;
        const s = syl[sp.i];
        if (s && t >= s.t) {
          if (sp.last !== sp.i) { sp.last = sp.i; this.onSyllable(s); if (sp.pointWord >= 0 && !sp.pointed && s.word >= sp.pointWord) { sp.pointed = true; this.react('point'); } }
          const ph = (t - s.t) / s.d; target = s.a * Math.sin(Math.PI * ph) ** .8;
        } else if (sp.i >= syl.length) {
          if (sp.driven) { const ph = (t % 240) / 240; target = .35 * Math.sin(Math.PI * ph); if (Math.floor(t / 240) !== sp.lastMumble) { sp.lastMumble = Math.floor(t / 240); this.onSyllable(); } }
          else if (t > sp.sch.end) this.stopTalking();
        }
      }
      // keep the hands moving on a long vowel
      if (this.speech && now - this.lastSwap > 900 && !(this.reaction && this.reaction.until > now)) { this.lastSwap = now - 500; this.onSyllable(); }
    }
    this.env = target;
    const k = 1 - Math.exp(-dt / (target > this.mouth ? .022 : .06));
    this.mouth += (target - this.mouth) * k;
    // squash spring, pumped by loudness
    const want = this.mouth * .045 * em.bob;
    const acc = -300 * (this.sq - want) - 22 * this.sqV;
    this.sqV += acc * dt; this.sq += this.sqV * dt;
    // blink
    if (!this.asleep && now >= this.blinkAt) {
      this.blinkStart = now;
      if (this.blinkTwice) { this.blinkTwice = false; this.blinkAt = now + 260; }
      else { this.blinkTwice = Math.random() < .2; this.blinkAt = now + (this.blinkTwice ? 260 : rnd(3000, 6000)); }
    }
    // glance: mostly at the chart, sometimes at the viewer
    if (now >= this.lookAt) {
      const side = this.opts.chartSide === 'left' ? -1 : 1;
      this.lookFrom = this.look.slice();
      this.lookTo = (this.lookTo[0] !== 0 || this.lookTo[1] !== 0) ? [0, 0] : [side * rnd(.15, .32) * (Math.random() < .8 ? 1 : -1), rnd(-.06, .1)];
      this.lookStart = now; this.lookAt = now + (this.lookTo[0] === 0 ? rnd(2500, 6000) : rnd(700, 1800));
    }
    const lt = clamp((now - this.lookStart) / 260, 0, 1);
    this.look = [lerp(this.lookFrom[0], this.lookTo[0], ease(lt)), lerp(this.lookFrom[1], this.lookTo[1], ease(lt))];
    // eye proportions follow the emotion softly
    const kk = 1 - Math.exp(-dt / .12);
    this.eyeSq[0] += (em.eyeW - this.eyeSq[0]) * kk; this.eyeSq[1] += (em.eyeH - this.eyeSq[1]) * kk;
    // zzz
    if (this.asleep) {
      if (now - this.zzzAt > 900) { this.zzzAt = now; this.zzz.push({ born: now, x: rnd(-.1, .1) }); }
      this.zzz = this.zzz.filter(z => now - z.born < 2600);
    }
  }

  eyesOf(pose) {
    const p = this.rig.poses[pose] || this.rig.poses.idle;
    return p.eyes;
  }
  mouthOf(pose) { const p = this.rig.poses[pose] || this.rig.poses.idle; return p.mouth; }

  draw() {
    const ctx = this.ctx, w = this.w, h = this.h, dpr = this.dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    if (!this.imgs || !w || !h) return;
    const now = this.now, t = (now - this.t0) / 1000, em = this.emotion;
    const fr = this.rig.frame, fw = fr[2] - fr[0], fh = fr[3] - fr[1];
    const s = Math.min(h * this.opts.fit / fh, w * .92 / fw);
    const feetX = w / 2, feetY = h - h * .035;
    // breathing + sway
    const slow = this.asleep;
    const breath = slow ? Math.sin(t * 2 * Math.PI / 5) * .022 : Math.sin(t * 2 * Math.PI / 3) * .012;
    const talk = this.speech ? 1 : 0;
    const calm = this.reduced ? .35 : 1;
    const sway = (Math.sin(t * 2 * Math.PI / 4.2) * .6 + Math.sin(t * 2 * Math.PI / 7.3) * .4) * (slow ? .4 : 1) * (1 + talk * (em.sway - 1) * .5) * calm;
    const rot = (sway + this.env * 1.3 * em.sway * this.swapSign * talk * calm) * Math.PI / 180;
    const shiftX = Math.sin(t * 2 * Math.PI / 5.1) * h * .004;
    // hop
    let hopY = 0, hopSq = 0;
    const hp = (now - this.hopAt) / 420;
    if (hp >= 0 && hp < 1) { hopY = -h * .09 * 4 * hp * (1 - hp); hopSq = (hp < .25 ? .08 : hp > .85 ? -.07 : 0); }
    const sq = this.sq + hopSq + (slow ? breath * .5 : breath);
    const sy = 1 + sq, sx = 1 - sq * .55;
    ctx.save();
    ctx.translate(feetX + shiftX, feetY + hopY);
    ctx.rotate(rot);
    ctx.scale(sx * s, sy * s);
    ctx.translate(-(fr[0] + fw / 2), -fr[3]);
    // layers: cross-fade. A plain alpha fade either pops (new over old) or lets the background through (both faded),
    // so the two layers are mixed additively on a scratch canvas: (1 - t) * old + t * new, exact in premultiplied space.
    const ft = clamp((now - this.fadeAt) / this.fadeMs, 0, 1), fe = ease(ft);
    const cur = this.imgs[this.pose] || this.imgs.idle, prev = this.imgs[this.prevPose] || this.imgs.idle;
    if (fe < 1 && prev !== cur) {
      if (!mix) { mix = document.createElement('canvas'); mix.width = mix.height = this.size; }
      const m = mix.getContext('2d');
      m.globalCompositeOperation = 'source-over'; m.globalAlpha = 1; m.clearRect(0, 0, this.size, this.size);
      m.globalCompositeOperation = 'lighter';
      m.globalAlpha = 1 - fe; m.drawImage(prev, 0, 0);
      m.globalAlpha = fe; m.drawImage(cur, 0, 0);
      m.globalAlpha = 1; m.globalCompositeOperation = 'source-over';
      ctx.drawImage(mix, 0, 0, this.size, this.size);
    } else ctx.drawImage(cur, 0, 0, this.size, this.size);
    // face geometry: eyes and mouth slide between the two poses' anchors during the fade
    const eA = this.eyesOf(this.prevPose), eB = this.eyesOf(this.pose), mA = this.mouthOf(this.prevPose), mB = this.mouthOf(this.pose);
    const closedArt = (this.rig.poses[this.pose] || {}).closed;
    const faceLift = -this.env * 6 * em.bob * talk;                 // the head lifts a touch on loud syllables
    const turn = -rot * 60;                                          // a little parallax so the sway reads as a turn
    const eyes = [0, 1].map(i => {
      const a = eA[i], b = eB[i];
      const bx = lerp(a[0] + a[2] / 2, b[0] + b[2] / 2, fe), by = lerp(a[1] + a[3] / 2, b[1] + b[3] / 2, fe);
      const bw = closedArt ? this.eyeW : lerp(a[2], b[2], fe), bh = closedArt ? this.eyeH : lerp(a[3], b[3], fe);
      return [bx + turn, by + faceLift, bw, bh];
    });
    const mouth = [lerp(mA[0], mB[0], fe) + turn, lerp(mA[1], mB[1], fe) + faceLift];
    // blink: 120 ms, closed in the middle
    let open = 1;
    const bp = (now - this.blinkStart) / 120;
    if (bp >= 0 && bp < 1) open = bp < .4 ? 1 - bp / .4 : bp < .55 ? 0 : (bp - .55) / .45;
    if (this.asleep) open = 0;
    ctx.fillStyle = INK; ctx.strokeStyle = INK; ctx.lineCap = 'round';
    eyes.forEach(([cx, cy, ew, eh], i) => {
      const ww = ew * this.eyeSq[0], hh = eh * this.eyeSq[1] * open;
      const lx = cx + this.look[0] * ew * .9, ly = cy + this.look[1] * eh * .5;
      if (hh > ww * .35) {
        ctx.beginPath(); ctx.roundRect(lx - ww / 2, ly - hh / 2, ww, hh, ww / 2); ctx.fill();
      } else {
        // closed or nearly closed: a soft bow (sleepy and smug curve down, a plain blink is flat)
        const bow = this.asleep || this.emotionName === 'smug' ? ew * .35 : ew * .05;
        ctx.lineWidth = Math.max(ww * .28, 2);
        ctx.beginPath(); ctx.moveTo(lx - ww * .62, ly); ctx.quadraticCurveTo(lx, ly + bow, lx + ww * .62, ly); ctx.stroke();
      }
    });
    // mouth: one standard mouth for every character
    const eW = this.eyeW;
    const o = this.asleep ? 0 : this.mouth;
    const rest = this.emotionName === 'scared' && !this.speech ? .22 : 0;
    const oo = Math.max(o, rest);
    if (oo < .09) {
      const mw = eW * .95, curve = em.curve * eW * .42 * (this.asleep ? .3 : 1);
      ctx.lineWidth = Math.max(eW * .2, 2);
      ctx.beginPath(); ctx.moveTo(mouth[0] - mw / 2, mouth[1]); ctx.quadraticCurveTo(mouth[0], mouth[1] + curve * 2, mouth[0] + mw / 2, mouth[1]); ctx.stroke();
    } else {
      const mw = eW * (1 + .6 * oo), mh = eW * (.22 + 1.3 * oo);
      ctx.beginPath(); ctx.roundRect(mouth[0] - mw / 2, mouth[1] - mh * .25 + (em.curve < 0 ? mh * .1 : 0), mw, mh, Math.min(mw, mh) / 2); ctx.fill();
    }
    // zzz: small z's rising from the head, each one a little bigger than the last, drifting to the side and fading
    if (this.asleep && this.zzz.length) {
      const e1 = eyes[1];
      ctx.fillStyle = ZZZ; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      for (const z of this.zzz) {
        const a = (now - z.born) / 2600, size = eW * (1 + a * 1.5);
        ctx.globalAlpha = a < .2 ? a / .2 : 1 - (a - .2) / .8;
        ctx.font = `600 ${size}px 'Geist', system-ui, sans-serif`;
        ctx.save();
        ctx.translate(e1[0] + eW * 2.6 + a * eW * 2 + z.x * eW + Math.sin(a * 9 + z.x * 20) * eW * .25, e1[1] - eW * 2.2 - a * eW * 5);
        ctx.rotate(-.15 + z.x);
        ctx.fillText('z', 0, 0);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    }
    ctx.restore();
    this.drawBrand();
  }

  // logo mark and name, top right, like a channel bug on a stream
  drawBrand() {
    const b = this.opts.brand; if (!b) return;
    const ctx = this.ctx, w = this.w, h = this.h;
    const size = Math.max(14, Math.round(h * .085)), pad = Math.max(10, Math.round(h * .05)), fs = Math.round(size * .62);
    ctx.save();
    ctx.globalAlpha = .9;
    ctx.font = `500 ${fs}px 'Geist', system-ui, sans-serif`; ctx.textBaseline = 'middle'; ctx.textAlign = 'right';
    const tw = ctx.measureText(b.text).width;
    const x = w - pad, y = pad + size / 2;
    ctx.fillStyle = '#fff'; ctx.fillText(b.text, x, y + fs * .06);
    if (this.logo && this.logo.complete && this.logo.naturalWidth) ctx.drawImage(this.logo, x - tw - size * .18 - size, y - size / 2, size, size);
    ctx.restore();
  }
}
