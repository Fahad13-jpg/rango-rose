/* eslint-disable @typescript-eslint/no-require-imports -- Node test harness uses CommonJS and the TypeScript compiler API. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../components/HeroScrollAnimation.tsx'), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
class Events {
  listeners = new Map();
  addEventListener(name, fn) { if (!this.listeners.has(name)) this.listeners.set(name, new Set()); this.listeners.get(name).add(fn); }
  removeEventListener(name, fn) { this.listeners.get(name)?.delete(fn); }
  fire(name) { for (const fn of this.listeners.get(name) || []) fn(); }
}
function mount({ mobile = false, reduced = false } = {}) {
  const window = new Events(); Object.assign(window, { scrollY: 0, innerHeight: 800, devicePixelRatio: 2, setTimeout, clearTimeout });
  const document = new Events(); document.hidden = false;
  const motion = new Events(); motion.matches = reduced;
  const phone = new Events(); phone.matches = mobile;
  window.matchMedia = query => query.includes('reduced-motion') ? motion : phone;
  const rafs = new Map(); let nextRaf = 1; let now = 0; let reads = 0;
  const draws = []; const requests = []; const pending = []; const bitmaps = []; let active = 0; let maxActive = 0; let observer;
  const container = { getBoundingClientRect() { reads++; return { top: -window.scrollY, height: 2400 }; } };
  const canvas = { style: {}, clientWidth: mobile ? 390 : 1280, clientHeight: 736, getContext: () => ({ clearRect() {}, drawImage(image) { draws.push(image.index); } }) };
  const poster = new Events(); Object.assign(poster, { complete: true, naturalWidth: 1280, naturalHeight: 720, index: 0, style: {} });
  const text = { style: {} }; const refs = [container, canvas, poster, text]; let ref = 0; let effect;
  const testModule = { exports: {} };
  const context = {
    module: testModule, exports: testModule.exports, window, document, URL, AbortController, Image: class {},
    require(name) { if (name === 'react') return { useRef: () => ({ current: refs[ref++] }), useEffect: fn => { effect = fn; } }; if (name === 'react/jsx-runtime') return { jsx: () => null, jsxs: () => null }; if (name === 'next/link') return { default: () => null }; throw Error(name); },
    requestAnimationFrame(fn) { const id = nextRaf++; rafs.set(id, fn); return id; }, cancelAnimationFrame(id) { rafs.delete(id); },
    ResizeObserver: class { observe() {} disconnect() {} },
    IntersectionObserver: class { constructor(fn) { observer = fn; } observe() {} disconnect() {} },
    fetch(url) { const index = Number(url.match(/frame_(\d+)/)[1]) - 1; requests.push(index); active++; maxActive = Math.max(maxActive, active); return new Promise(resolve => pending.push(() => { active--; resolve({ ok: true, blob: async () => ({ index }) }); })); },
    async createImageBitmap(blob) { const image = { index: blob.index, width: 1280, height: 720, closed: false, close() { this.closed = true; } }; bitmaps.push(image); return image; },
  };
  vm.createContext(context); vm.runInContext(compiled, context); testModule.exports.default(); const cleanup = effect();
  async function microtasks() { for (let i = 0; i < 12; i++) await Promise.resolve(); }
  async function frames(count = 120) { for (let i = 0; i < count && rafs.size; i++) { const batch = [...rafs.values()]; rafs.clear(); now += 16.67; batch.forEach(fn => fn(now)); await microtasks(); } }
  async function network() { for (let i = 0; i < 100 && pending.length; i++) { pending.splice(0).forEach(fn => fn()); await microtasks(); } }
  return { window, document, motion, canvas, poster, text, draws, requests, pending, bitmaps, rafs, cleanup, frames, network,
    get reads() { return reads; }, get maxActive() { return maxActive; }, visible(value) { observer([{ isIntersecting: value }]); } };
}
test('idle renderer stops, scroll uses cached geometry, late frames repaint without another scroll', async () => {
  const h = mount(); await h.frames(); await h.network(); await h.frames();
  assert.equal(h.rafs.size, 0); assert.ok(h.maxActive <= 3);
  const reads = h.reads;
  h.window.scrollY = 1280; h.window.fire('scroll'); await h.frames();
  assert.equal(h.reads, reads, 'no scroll-time layout measurement');
  assert.equal(h.rafs.size, 0, 'settled animation has no RAF work');
  await h.network(); await h.frames();
  assert.equal(h.draws.at(-1), 111, 'late-decoded target paints without another scroll event');
  assert.ok(h.bitmaps.filter(image => !image.closed).length <= 19);
  assert.ok(h.canvas.width <= 1280 && h.canvas.height <= 720);
  h.window.scrollY = 0; h.window.fire('scroll'); await h.frames(); await h.network(); await h.frames();
  assert.equal(h.draws.at(-1), 0, 'reverse scrolling restores the first frame');
  h.cleanup(); assert.ok(h.bitmaps.every(image => image.closed));
});
test('phone loading is bounded and hidden/offscreen work pauses', async () => {
  const h = mount({ mobile: true }); await h.frames(); await h.network(); await h.frames();
  assert.ok(h.maxActive <= 2); assert.ok(h.bitmaps.filter(image => !image.closed).length <= 11);
  h.visible(false); h.window.scrollY = 900; h.window.fire('scroll'); assert.equal(h.rafs.size, 0);
  h.visible(true); assert.ok(h.rafs.size > 0);
  h.document.hidden = true; h.document.fire('visibilitychange'); assert.equal(h.rafs.size, 0);
  h.cleanup();
});
test('reduced motion fetches no sequence and keeps the visible poster', async () => {
  const h = mount({ reduced: true }); await h.frames(); await h.network();
  assert.equal(h.requests.length, 0); assert.equal(h.rafs.size, 0); assert.notEqual(h.poster.style.visibility, 'hidden'); h.cleanup();
});
