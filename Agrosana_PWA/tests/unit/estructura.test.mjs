// Reglas estáticas de la Actividad 2 (spec 003, plan → Estrategia de pruebas U1–U5).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const ACT = path.join(RAIZ, 'act2');
const leer = (rel) => fs.readFileSync(path.join(ACT, rel), 'utf8');
const existe = (rel) => fs.existsSync(path.join(ACT, rel));

function archivosDe(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? archivosDe(path.join(dir, e.name)) : [path.join(dir, e.name)]);
}
const textos = () => archivosDe(ACT).filter((f) => /\.(html|css|js|svg)$/.test(f));

// Recursos externos aprobados (ADR 0004): URL → huella SRI exacta.
const APROBADOS = {
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css':
    'sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==',
};

test('U1 · act2 tiene la estructura mínima, sin PWA y sin package.json en la raíz (CA1, P3, P8, RD1.a)', () => {
  for (const rel of ['index.html', 'css/estilos.css', 'js/app.js']) assert.ok(existe(rel), `falta act2/${rel}`);
  assert.ok(fs.statSync(path.join(ACT, 'img')).isDirectory(), 'falta act2/img/');
  assert.ok(archivosDe(path.join(ACT, 'img')).length > 0, 'act2/img/ está vacía');
  for (const prohibido of ['manifest.json', 'manifest.webmanifest', 'sw.js', 'service-worker.js']) {
    assert.ok(!existe(prohibido), `act2/${prohibido} no debe existir (P8)`);
  }
  assert.doesNotMatch(leer('js/app.js'), /serviceWorker|caches\.|localStorage|indexedDB/, 'sin Service Worker, caché ni almacenamiento (P8)');
  assert.doesNotMatch(leer('index.html'), /rel=["']manifest/, 'sin manifest enlazado (P8)');
  assert.ok(!fs.existsSync(path.join(RAIZ, 'package.json')), 'la raíz no debe tener package.json (RD1.a)');
  assert.match(leer('index.html'), /href="css\/estilos\.css"/, 'index.html enlaza css/estilos.css');
  assert.match(leer('index.html'), /src="js\/app\.js"/, 'index.html carga js/app.js');
});

test('U2 · solo recursos externos aprobados y con integridad (CA17, P4)', () => {
  const html = leer('index.html');
  const etiquetas = html.match(/<(link|script|img|iframe|source)\b[^>]*>/gi) || [];
  for (const etiqueta of etiquetas) {
    const url = (etiqueta.match(/\b(?:href|src)="([^"]+)"/i) || [])[1];
    if (!url || !/^(https?:)?\/\//i.test(url)) continue;
    assert.ok(url in APROBADOS, `recurso externo no aprobado: ${url}`);
    assert.match(etiqueta, new RegExp(`integrity="${APROBADOS[url].replace(/[+/=]/g, (c) => '\\' + c)}"`), `${url} sin integrity correcto`);
    assert.match(etiqueta, /crossorigin="anonymous"/, `${url} sin crossorigin="anonymous"`);
  }
  assert.ok(Object.keys(APROBADOS).every((u) => html.includes(u)), 'Font Awesome debe cargarse desde la URL aprobada');
  for (const f of archivosDe(ACT).filter((x) => /\.(css|js)$/.test(x))) {
    assert.doesNotMatch(fs.readFileSync(f, 'utf8'), /@import|url\(\s*["']?https?:/i, `${path.relative(RAIZ, f)} carga recursos externos`);
  }
});

test('U3 · sin emojis y con iconos de Font Awesome (CA14, P5)', () => {
  const emoji = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{1F1E6}-\u{1F1FF}\u{FE0F}\u{200D}\u{20E3}]/u;
  for (const f of textos()) {
    const linea = fs.readFileSync(f, 'utf8').split('\n').findIndex((l) => emoji.test(l));
    assert.equal(linea, -1, `emoji en ${path.relative(RAIZ, f)}:${linea + 1}`);
  }
  const iconos = leer('index.html').match(/<i class="fa-(solid|regular|brands) fa-[a-z0-9-]+[^"]*"[^>]*>/g) || [];
  assert.ok(iconos.length >= 10, `se esperaban al menos 10 iconos fa-, hay ${iconos.length}`);
  for (const i of iconos) assert.match(i, /aria-hidden="true"/, `icono sin aria-hidden: ${i}`);
});

test('U4 · sin sinks peligrosos, consola, formularios ni envíos externos (CA12, CA16, CA18, P9, OB1.a)', () => {
  const js = leer('js/app.js');
  for (const [nombre, patron] of Object.entries({
    innerHTML: /\.innerHTML\b/, outerHTML: /\.outerHTML\b/, insertAdjacentHTML: /insertAdjacentHTML/,
    'document.write': /document\.write/, eval: /\beval\s*\(/, 'new Function': /new\s+Function\b/,
    'setTimeout con texto': /set(Timeout|Interval)\s*\(\s*["'`]/, 'console.*': /\bconsole\./,
    'lectura de location': /\blocation\b/,
  })) assert.doesNotMatch(js, patron, `app.js usa ${nombre}`);
  const html = leer('index.html');
  assert.doesNotMatch(html, /<form\b/i, 'sin formularios (CA12, RS1.a)');
  assert.doesNotMatch(html, /<(input|textarea|select)\b/i, 'sin campos que pidan datos (CA12)');
  assert.doesNotMatch(html, /\son[a-z]+\s*=/i, 'sin manejadores en línea');
  assert.doesNotMatch(html, /<script(?![^>]*\bsrc=)[^>]*>/i, 'sin scripts en línea');
});

test('U5 · rutas internas relativas (P3)', () => {
  const html = leer('index.html');
  const refs = [...html.matchAll(/\b(?:href|src)="([^"]+)"/gi)].map((m) => m[1]);
  for (const r of refs) {
    if (/^(https:\/\/|mailto:|tel:|#)/.test(r)) continue;
    assert.doesNotMatch(r, /^(\/|file:|[a-z]:\\|http:)/i, `ruta no relativa: ${r}`);
    const destino = path.join(ACT, r.split(/[?#]/)[0]);
    assert.ok(fs.existsSync(destino), `ruta rota: ${r}`);
  }
  const css = leer('css/estilos.css');
  for (const m of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
    if (m[1].startsWith('data:')) continue;
    assert.ok(fs.existsSync(path.join(ACT, 'css', m[1])), `url() rota en estilos.css: ${m[1]}`);
  }
});

// --- Sistema de diseño (spec 003, plan → Estrategia de pruebas: U1 fuentes, U6 y U7; constitución P12) ---
import crypto from 'node:crypto';

// Fuentes autoalojadas (ADR 0007): archivo → sha256.
const FUENTES = {
  'fonts/ibm-plex-sans-condensed-latin-700-normal.woff2': '4768878c107d92c528a65bba206a87cdcf2c694514e75907fb91772cf8a388a5',
  'fonts/ibm-plex-sans-latin-400-normal.woff2': '3b646991d30055a93a4ecc499713d4347953a74a947ecab435ab72070cbdab0e',
  'fonts/ibm-plex-sans-latin-600-normal.woff2': '8960851d691c054ed38e259bdcf1a6190d157b4203ed5bb32c632a863fb8ec2f',
  'fonts/ibm-plex-sans-latin-700-normal.woff2': '42e7b0c143c19df9d99fd896e76b48f846edf0902d200bc29796b34d12c33aa7',
};

test('U1 · fuentes IBM Plex autoalojadas con su huella y sin la ilustración retirada (ADR 0007, P3, P4)', () => {
  for (const [rel, sha] of Object.entries(FUENTES)) {
    assert.ok(existe(rel), `falta act2/${rel}`);
    const real = crypto.createHash('sha256').update(fs.readFileSync(path.join(ACT, rel))).digest('hex');
    assert.equal(real, sha, `act2/${rel} no coincide con la huella de ADR 0007`);
  }
  assert.ok(existe('fonts/OFL.txt'), 'falta act2/fonts/OFL.txt (licencia)');
  assert.ok(!existe('img/campo.svg'), 'act2/img/campo.svg ya no se usa y no debe existir');
});

// U6: literales fuera de los tokens. Devuelve la lista de infracciones de un texto CSS.
const COLOR_NOMBRE = /\b(white|black|red|green|blue|gr[ae]y|yellow|orange|purple|pink|brown|silver|gold)\b/i;
const TIPOGRAFIA = /^(font-size|font-weight|line-height|letter-spacing|font-stretch)$/;
export function literalesFueraDeTokens(css) {
  let t = css.replace(/\/\*[\s\S]*?\*\//g, '');
  t = t.replace(/@font-face\s*\{[^{}]*\}/g, '');
  t = t.replace(/:root\s*\{[^{}]*\}/g, '');
  t = t.replace(/@media[^{]*\{/g, '@media{');
  t = t.replace(/(?:\b(?:from|to)\b|\d+(?:\.\d+)?%)(?:\s*,\s*(?:\b(?:from|to)\b|\d+(?:\.\d+)?%))*\s*\{/g, '{');
  const malos = [];
  for (const bloque of t.matchAll(/\{([^{}]*)\}/g)) {
    for (const decl of bloque[1].split(';')) {
      const m = decl.match(/^\s*([a-z-]+)\s*:\s*([\s\S]+?)\s*$/i);
      if (!m || m[1].startsWith('--')) continue;
      const [, prop, valor] = m;
      const ver = `${prop}: ${valor}`;
      if (/#[0-9a-f]{3,8}\b|\b(?:rgb|hsl)a?\(/i.test(valor) || COLOR_NOMBRE.test(valor)) malos.push(`color literal · ${ver}`);
      for (const l of valor.matchAll(/(-?\d*\.?\d+)(px|rem|em|ch|vw|vh)\b/g)) if (parseFloat(l[1]) !== 0) malos.push(`longitud literal · ${ver}`);
      // Un multiplicador decimal dentro de calc() crea un tamaño que el sistema no nombra (R6).
      if (/calc\([^;]*[*/]\s*-?\d*\.\d+/.test(valor) || /calc\([^;]*-?\d*\.\d+\s*\*/.test(valor)) malos.push(`multiplicador literal · ${ver}`);
      for (const d of valor.matchAll(/(?<![\w-])(\d*\.?\d+)(ms|s)\b/g)) if (parseFloat(d[1]) !== 0) malos.push(`duración literal · ${ver}`);
      if (prop === 'font-family' && !/^var\(/.test(valor)) malos.push(`font-family literal · ${ver}`);
      if (prop === 'font' && !/^(var\(|inherit$)/.test(valor)) malos.push(`font literal · ${ver}`);
      if (TIPOGRAFIA.test(prop) && !/^(var\([^)]*\)|inherit)$/.test(valor)) malos.push(`tipografía literal · ${ver}`);
    }
  }
  return malos;
}

test('U6 · el detector de literales reconoce cada clase (controles positivos)', () => {
  const casos = {
    'color literal': '.x{color:#111611}', 'color rgb': '.x{background:rgba(0,0,0,.5)}', 'color con nombre': '.x{color:white}',
    'longitud px': '.x{padding:12px}', 'longitud 1px': '.x{border:1px solid var(--c)}', 'longitud ch': '.x{max-width:54ch}',
    'duración': '.x{transition:opacity 150ms}', 'font-family': '.x{font-family:"IBM Plex Sans",sans-serif}',
    'font': '.x{font:700 16px sans-serif}', 'font-weight': '.x{font-weight:700}', 'line-height': '.x{line-height:1.55}',
    'letter-spacing': '.x{letter-spacing:-.01em}', 'font-stretch': '.x{font-stretch:75%}',
    'dentro de @media': '@media (max-width:767px){.x{margin:16px}}',
    'multiplicador en calc': '.x{width:calc(var(--size-foto) * 0.6)}',
  };
  for (const [nombre, css] of Object.entries(casos)) assert.ok(literalesFueraDeTokens(css).length > 0, `no detecta: ${nombre}`);
  const permitidos = ':root{--a:#fff;--b:12px}@media (max-width:767px){:root{--b:8px}}@font-face{font-family:"X";src:url(a.woff2)}'
    + '@keyframes k{0%{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0)}}'
    + '.x{color:var(--a);padding:var(--b) 0;grid-template-columns:minmax(0,2fr) 1fr;flex:1 1 50%;width:100%;transition-duration:0s;font:inherit;font-weight:var(--w)}';
  assert.deepEqual(literalesFueraDeTokens(permitidos), [], 'falso positivo en lo permitido');
});

test('U6 · estilos.css y index.html usan solo los tokens del sistema (P12)', () => {
  const css = leer('css/estilos.css');
  const declaraciones = css.replace(/:root\s*\{[^{}]*\}/g, '').match(/[a-z-]+\s*:[^;{}]+[;}]/gi) || [];
  assert.ok(declaraciones.length >= 100, `estilos.css casi vacío (${declaraciones.length} declaraciones fuera de :root): no hay nada que comprobar`);
  assert.deepEqual(literalesFueraDeTokens(css), [], 'literales fuera de los tokens');
  assert.doesNotMatch(leer('index.html'), /\sstyle\s*=/i, 'index.html no debe tener atributos style');
});

// U7: tokens del sistema. Lee las tablas de system.md y las compara con :root.
const norm = (v) => v.replace(/["'`\s]/g, '').replace(/(^|[^\d])0\./g, '$1.').toLowerCase();
export function tokensDeSistema(md) {
  const out = {};
  const valorDe = (celda) => {
    const c = celda.trim();
    const bt = c.match(/^`([^`]+)`/);
    return bt ? bt[1] : c.split(' (')[0].trim();
  };
  for (const linea of md.split('\n')) {
    if (!linea.startsWith('| `--')) continue;
    const celdas = linea.split('|').slice(1, -1);
    const nombres = [...celdas[0].matchAll(/`(--[a-z0-9-]+)`/g)].map((m) => m[1]);
    if (celdas[0].includes('…')) {                      // `--space-1` … `--space-8` | 4px, 8px, …
      const [a, b] = nombres; const pre = a.replace(/\d+$/, '');
      const vals = celdas[1].split(',').map((x) => x.trim());
      for (let i = +a.match(/\d+$/)[0], k = 0; i <= +b.match(/\d+$/)[0]; i++, k++) out[`${pre}${i}`] = vals[k];
    } else if (nombres.length > 1 && celdas[0].includes('·')) {   // `--a` · `--b` | 1 · 2
      const vals = celdas[1].split('·').map((x) => valorDe(x));
      nombres.forEach((n, i) => { out[n] = vals[i]; });
    } else if (celdas.length >= 4 && /^\s*\d/.test(celdas[1]) && /^\s*\d/.test(celdas[2])) {  // Nivel | Móvil | Escritorio | …
      out[nombres[0]] = valorDe(celdas[2]);
      const movil = celdas[1].match(/^\s*([^\s(]+)\s*\(`(--[a-z0-9-]+)`\)/);
      if (movil) out[movil[2]] = movil[1];
    } else {
      out[nombres[0]] = valorDe(celdas[1]);
    }
  }
  return out;
}
const COPIA = path.join(RAIZ, 'tests', 'unit', 'tokens-sistema.json');
const SISTEMA = path.join(RAIZ, 'docs', 'design', 'system.md');

test('U7 · la copia versionada de tokens coincide con docs/design/system.md (P12)', (t) => {
  if (!fs.existsSync(SISTEMA)) { t.diagnostic('aviso: docs/ no está (no se versiona); se compara solo con la copia'); return; }
  const copia = JSON.parse(fs.readFileSync(COPIA, 'utf8'));
  assert.deepEqual(copia, tokensDeSistema(fs.readFileSync(SISTEMA, 'utf8')), 'tests/unit/tokens-sistema.json está desactualizado respecto a system.md');
});

test('U7 · :root de estilos.css tiene los tokens del sistema con sus valores (P12)', () => {
  const copia = JSON.parse(fs.readFileSync(COPIA, 'utf8'));
  assert.ok(Object.keys(copia).length >= 70, 'la copia de tokens parece incompleta');
  // Primer :root de nivel superior (sin comentarios; los :root dentro de @media son ajustes).
  const sinComentarios = leer('css/estilos.css').replace(/\/\*[\s\S]*?\*\//g, '');
  const raiz = (sinComentarios.match(/(?:^|\})\s*:root\s*\{([^{}]*)\}/) || [])[1] || '';
  const reales = Object.fromEntries([...raiz.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+)/g)].map((m) => [m[1], m[2].trim()]));
  const faltan = Object.keys(copia).filter((k) => !(k in reales));
  assert.deepEqual(faltan, [], 'tokens del sistema que faltan en :root');
  const distintos = Object.keys(copia).filter((k) => norm(reales[k]) !== norm(copia[k]));
  assert.deepEqual(distintos.map((k) => `${k}: ${reales[k]} ≠ ${copia[k]}`), [], 'valores distintos de system.md');
});
