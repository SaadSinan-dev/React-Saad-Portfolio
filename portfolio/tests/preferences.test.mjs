import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const prepaint = html.match(/<script>\s*([\s\S]*?)<\/script>/)[1];
const themeHook = readFileSync(new URL('../src/hooks/useDarkMode.js', import.meta.url), 'utf8')
  .replace(/^import[^\n]+\n/, '')
  .replace('export function useDarkMode', 'function useDarkMode');

function browser({ theme = null, lang = null, osDark = false, storageUnavailable = false } = {}) {
  const saved = new Map([['portfolio-theme', theme], ['portfolio-lang', lang]]);
  const classes = new Set();
  const metas = Array.from(html.matchAll(/<meta\s+[^>]*name="(color-scheme|theme-color)"[^>]*>/g), ([tag, name]) => {
    const attributes = Object.fromEntries(Array.from(tag.matchAll(/([\w-]+)="([^"]*)"/g), ([, key, value]) => [key, value]));
    return {
      name,
      getAttribute: (key) => attributes[key] ?? null,
      setAttribute: (key, value) => { attributes[key] = value; },
    };
  });
  const document = {
    documentElement: {
      lang: 'en',
      dir: 'ltr',
      style: {},
      classList: {
        add: (name) => classes.add(name),
        contains: (name) => classes.has(name),
        toggle: (name, enabled) => enabled ? classes.add(name) : classes.delete(name),
      },
    },
    querySelector: (selector) => metas.find((meta) => selector.includes(`"${meta.name}"`)),
  };
  const context = {
    document,
    window: { matchMedia: () => ({ matches: osDark }) },
    localStorage: {
      getItem(key) {
        if (storageUnavailable) throw new Error('Storage unavailable');
        return saved.get(key) ?? null;
      },
      setItem(key, value) {
        if (storageUnavailable) throw new Error('Storage unavailable');
        saved.set(key, value);
      },
    },
  };
  runInNewContext(prepaint, context);
  return { ...context, metas, saved };
}

function assertPreferences(page, { dark, lang, dir, scheme, color }) {
  assert.equal(page.document.documentElement.classList.contains('dark'), dark);
  assert.equal(page.document.documentElement.lang, lang);
  assert.equal(page.document.documentElement.dir, dir);
  assert.equal(page.metas.find((meta) => meta.name === 'color-scheme').getAttribute('content'), scheme);
  assert.equal(page.metas.filter((meta) => meta.name === 'theme-color').length, 1);
  assert.equal(page.metas.find((meta) => meta.name === 'theme-color').getAttribute('content'), color);
}

const englishLight = { dark: false, lang: 'en', dir: 'ltr', scheme: 'light', color: '#f8f8f6' };
const englishDark = { ...englishLight, dark: true, scheme: 'dark', color: '#0d0e10' };

test('fresh visitors start in English and dark mode regardless of OS preference', () => {
  for (const osDark of [false, true]) {
    assertPreferences(browser({ osDark }), englishDark);
  }
});

test('valid explicit language and theme choices survive an OS dark preference', () => {
  for (const choice of [
    { theme: 'light', lang: 'en', expected: englishLight },
    { theme: 'light', lang: 'ar', expected: { ...englishLight, lang: 'ar', dir: 'rtl' } },
    { theme: 'dark', lang: 'en', expected: { ...englishLight, dark: true, scheme: 'dark', color: '#0d0e10' } },
    { theme: 'dark', lang: 'ar', expected: { dark: true, lang: 'ar', dir: 'rtl', scheme: 'dark', color: '#0d0e10' } },
  ]) {
    assertPreferences(browser({ ...choice, osDark: true }), choice.expected);
  }
});

test('unsupported saved values fall back to English and dark mode before paint', () => {
  for (const invalid of ['', 'system', 'fr', 'AR']) {
    assertPreferences(browser({ theme: invalid, lang: invalid, osDark: true }), englishDark);
  }
});

test('unavailable storage retains English and dark metadata before paint', () => {
  assertPreferences(browser({ storageUnavailable: true, osDark: true }), englishDark);
});

test('theme toggles update the painted theme, browser metadata and persisted choice together', () => {
  const page = browser();
  let state;
  let effect;
  const context = {
    ...page,
    useState(initial) {
      if (state === undefined) state = initial();
      return [state, (value) => { state = value; }];
    },
    useEffect(callback) { effect = callback; },
  };
  runInNewContext(`${themeHook}\nthis.renderTheme = useDarkMode;`, context);

  const [, setDark] = context.renderTheme();
  effect();
  setDark(true);
  context.renderTheme();
  effect();
  assertPreferences(page, { dark: true, lang: 'en', dir: 'ltr', scheme: 'dark', color: '#0d0e10' });
  assert.equal(page.saved.get('portfolio-theme'), 'dark');

  setDark(false);
  context.renderTheme();
  effect();
  assertPreferences(page, englishLight);
  assert.equal(page.saved.get('portfolio-theme'), 'light');
});
