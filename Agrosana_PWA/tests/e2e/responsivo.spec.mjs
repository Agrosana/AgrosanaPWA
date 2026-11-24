// E15 (spec 003: CA15, CA2; constitución P6) — se ejecuta en los tres proyectos: 360, 768 y 1440 px.
import { test, expect } from '@playwright/test';
import { prepararCdn } from '../apoyo/cdn.mjs';

const COLUMNAS = { movil: 1, tableta: 2, escritorio: 3 };

// Columnas de la rejilla que contiene las tarjetas (no tarjetas de la primera fila: la primera
// tarjeta de Nosotros ocupa toda la fila a 768 px por diseño; A17, decisión del usuario 2026-10-09).
async function columnas(page, selector) {
  return page.$$eval(selector, (els) => {
    const rejilla = els[0].parentElement;
    const cs = getComputedStyle(rejilla);
    if (cs.display !== 'grid') return 0;
    return cs.gridTemplateColumns.split(' ').filter(Boolean).length;
  });
}

test.beforeEach(async ({ page }) => { await prepararCdn(page); await page.goto('act2/'); });

test('E15 · sin desplazamiento horizontal', async ({ page }) => {
  await expect(page.locator('#productos article.producto').first()).toBeVisible();
  const { anchoDoc, anchoVentana } = await page.evaluate(() => ({
    anchoDoc: document.documentElement.scrollWidth, anchoVentana: window.innerWidth,
  }));
  expect(anchoDoc).toBeLessThanOrEqual(anchoVentana);
  const desbordados = await page.$$eval('body *', (els) => els
    .filter((e) => e.offsetParent !== null && e.getBoundingClientRect().right > window.innerWidth + 1)
    .map((e) => `${e.tagName.toLowerCase()}.${e.className}`));
  expect(desbordados).toEqual([]);
});

test('E15 · las tarjetas se acomodan en 1, 2 o 3 columnas según el ancho', async ({ page }) => {
  const esperado = COLUMNAS[test.info().project.name];
  expect(await columnas(page, '#productos article.producto')).toBe(esperado);
  expect(await columnas(page, '#nosotros article.tarjeta')).toBe(esperado);
});

test('E15 · el encabezado sigue visible tras desplazarse', async ({ page }) => {
  await page.locator('#uso-seguro').scrollIntoViewIfNeeded();
  await expect(page.locator('header.encabezado').getByRole('img', { name: 'AgroSana' })).toBeInViewport();
});
