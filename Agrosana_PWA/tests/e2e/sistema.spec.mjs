// E19, E20 (spec 003: RNF tipografía autoalojada y RNF momento firma; constitución P4, P12;
// docs/design/system.md → Tipografía y Movimiento)
import { test, expect } from '@playwright/test';
import { prepararCdn } from '../apoyo/cdn.mjs';

const soloEscritorio = () => test.skip(test.info().project.name !== 'escritorio', 'se comprueba en 1440 px');
// Único origen externo aceptado para fuentes: Font Awesome de ADR 0004 (A44).
const PREFIJO_FA = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/';

test.beforeEach(async ({ page }) => { await prepararCdn(page); });

test('E19 · IBM Plex se carga desde act2/fonts/ y ninguna fuente sale de los orígenes aprobados', async ({ page, baseURL }) => {
  soloEscritorio();
  const fuentes = [];
  page.on('request', (r) => { if (r.resourceType() === 'font') fuentes.push(r.url()); });
  await page.goto('act2/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  // document.fonts.check() da true aunque la fuente no exista: se mira el estado de cada FontFace.
  const cargadas = await page.evaluate(() => [...document.fonts]
    .filter((f) => f.status === 'loaded').map((f) => f.family.replace(/["']/g, '')));
  expect(cargadas).toContain('IBM Plex Sans');
  expect(cargadas).toContain('IBM Plex Sans Condensed');
  const propias = new URL('act2/fonts/', baseURL).href;
  const plex = fuentes.filter((u) => /ibm-plex/i.test(u));
  expect(plex.length).toBeGreaterThanOrEqual(2);
  for (const u of plex) expect(u.startsWith(propias), `IBM Plex pedida fuera de act2/fonts/: ${u}`).toBe(true);
  const fuera = fuentes.filter((u) => !u.startsWith(propias) && !u.startsWith(PREFIJO_FA));
  expect(fuera).toEqual([]);
});

const estadoFranja = (page) => page.locator('#inicio nav.franja').evaluate((f) => {
  const cs = getComputedStyle(f);
  return {
    animacion: cs.animationName,
    clip: cs.clipPath,
    enCurso: f.getAnimations().filter((a) => a.playState === 'running').length,
  };
});
// Completa: sin recorte, o inset() con todos sus valores en 0 (el navegador puede dar 0px o 0%).
const completa = (clip) => clip === 'none'
  || (/^inset\(/.test(clip) && (clip.match(/-?\d*\.?\d+/g) || []).every((n) => parseFloat(n) === 0));

test('E20 · con movimiento reducido la franja de categorías está completa desde el inicio', async ({ page }) => {
  soloEscritorio();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('act2/');
  await expect(page.locator('#inicio nav.franja a')).toHaveCount(4);
  const e = await estadoFranja(page);
  expect(e.enCurso).toBe(0);
  expect(completa(e.clip), `clip-path pendiente: ${e.clip}`).toBe(true);
});

test('E20 · sin preferencia, la franja se imprime una vez y termina completa', async ({ page }) => {
  soloEscritorio();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('act2/');
  await expect(page.locator('#inicio nav.franja a')).toHaveCount(4);
  const inicio = await estadoFranja(page);
  expect(inicio.animacion, 'la franja no tiene su momento firma').not.toBe('none');
  await expect.poll(async () => (await estadoFranja(page)).enCurso, { timeout: 3000 }).toBe(0);
  const fin = await estadoFranja(page);
  expect(completa(fin.clip), `clip-path pendiente: ${fin.clip}`).toBe(true);
});
