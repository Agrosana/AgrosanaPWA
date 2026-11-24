// E18 (spec 003: RNF accesibilidad; constitución P7)
import { test, expect } from '@playwright/test';
import { prepararCdn } from '../apoyo/cdn.mjs';

test.beforeEach(async ({ page }) => { await prepararCdn(page); await page.goto('act2/', { waitUntil: 'networkidle' }); });

test('E18 · toda imagen de contenido tiene texto alternativo', async ({ page }) => {
  expect(await page.locator('img').count(), 'la página debe tener sus imágenes').toBeGreaterThanOrEqual(7);
  const sinAlt = await page.$$eval('img', (imgs) => imgs
    .filter((i) => i.getAttribute('aria-hidden') !== 'true' && i.getAttribute('role') !== 'presentation')
    .filter((i) => !(i.getAttribute('alt') || '').trim())
    .map((i) => i.src));
  expect(sinAlt).toEqual([]);
});

test('E18 · el texto visible tiene contraste ≥ 4.5:1 (≥ 3:1 si es grande)', async ({ page }) => {
  const fallos = await page.evaluate(() => {
    const rgb = (c) => (c.match(/[\d.]+/g) || []).map(Number);
    const lum = ([r, g, b]) => {
      const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const fondo = (el) => {
      for (let e = el; e; e = e.parentElement) {
        const s = getComputedStyle(e);
        if (s.backgroundImage !== 'none' && !e.matches('body, html')) return null; // imagen o degradado: se omite
        const c = rgb(s.backgroundColor);
        if (c.length >= 3 && (c.length === 3 || c[3] > 0.95)) return c.slice(0, 3);
      }
      return [255, 255, 255];
    };
    const res = []; let revisados = 0;
    const caminante = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const vistos = new Set();
    while (caminante.nextNode()) {
      const el = caminante.currentNode.parentElement;
      if (!caminante.currentNode.textContent.trim() || vistos.has(el)) continue;
      vistos.add(el);
      if (!el.checkVisibility || !el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue;
      if (el.closest('[aria-hidden="true"], dialog:not([open])')) continue;
      const s = getComputedStyle(el);
      const bg = fondo(el);
      if (!bg) continue;
      const fg = rgb(s.color).slice(0, 3);
      const [a, b] = [lum(fg), lum(bg)].sort((x, y) => y - x);
      const ratio = (a + 0.05) / (b + 0.05);
      const tam = parseFloat(s.fontSize); const negrita = Number(s.fontWeight) >= 700;
      revisados++;
      const minimo = tam >= 24 || (negrita && tam >= 18.66) ? 3 : 4.5;
      if (ratio < minimo) res.push(`${el.tagName.toLowerCase()}.${el.className} "${el.textContent.trim().slice(0, 30)}" ${ratio.toFixed(2)} < ${minimo}`);
    }
    return { res, revisados };
  });
  expect(fallos.revisados, 'debe revisar el texto de la página').toBeGreaterThanOrEqual(40);
  expect(fallos.res).toEqual([]);
});

// Contraste del anillo de foco contra lo que hay debajo de él: se mira el elemento que ocupa cada
// lado del anillo (fuera de la caja si el anillo es exterior, dentro si es interior) y su fondo.
const medirFoco = () => {
  const rgb = (c) => (c.match(/[\d.]+/g) || []).map(Number);
  const lum = ([r, g, b]) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const fondo = (el) => {
    for (let e = el; e; e = e.parentElement) {
      const c = rgb(getComputedStyle(e).backgroundColor);
      if (c.length >= 3 && (c.length === 3 || c[3] > 0.95)) return c.slice(0, 3);
    }
    return [255, 255, 255];
  };
  const e = document.activeElement;
  if (!e || e === document.body) return null;
  const s = getComputedStyle(e);
  const nombre = `${e.tagName.toLowerCase()}.${e.className} ${(e.textContent || e.getAttribute('aria-label') || '').trim().slice(0, 25)}`;
  const ancho = parseFloat(s.outlineWidth);
  if (s.outlineStyle === 'none' || ancho < 2) return { nombre, ratio: 0, motivo: 'sin anillo' };
  const anillo = rgb(s.outlineColor).slice(0, 3);
  const d = parseFloat(s.outlineOffset) + ancho / 2; // distancia del centro del anillo al borde de la caja
  const r = e.getBoundingClientRect();
  const cx = r.left + r.width / 2; const cy = r.top + r.height / 2;
  const puntos = [[cx, r.top - d], [cx, r.bottom + d], [r.left - d, cy], [r.right + d, cy]];
  let peor = Infinity;
  for (const [x, y] of puntos) {
    if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) continue;
    // Debajo del anillo: lo que se ve bajo ese punto ignorando el propio anillo.
    const debajo = document.elementsFromPoint(x, y).find((el) => el !== e || d < 0) || document.body;
    const bg = d < 0 ? fondo(e) : fondo(debajo === e ? e.parentElement : debajo);
    const [a, b] = [lum(anillo), lum(bg)].sort((x1, y1) => y1 - x1);
    peor = Math.min(peor, (a + 0.05) / (b + 0.05));
  }
  return { nombre, ratio: peor === Infinity ? 21 : peor, motivo: 'contraste' };
};

test('E18 · el foco del teclado es visible en cada control (anillo ≥ 3:1 sobre su fondo)', async ({ page }) => {
  const enMovil = test.info().project.name !== 'escritorio';
  if (enMovil) await page.getByRole('button', { name: 'Menú' }).click();
  await page.locator('body').focus();
  const malos = []; const vistos = new Set(); let primero = null;
  for (let i = 0; i < 120; i++) {
    await page.keyboard.press('Tab');
    const clave = await page.evaluate(() => {
      const e = document.activeElement;
      // Posición en el documento: dos enlaces iguales (menú y pie) cuentan por separado.
      return e && e !== document.body ? [...document.querySelectorAll('*')].indexOf(e) : null;
    });
    if (clave === null) continue;
    if (clave === primero) break;
    primero = primero || clave;
    if (vistos.has(clave)) continue;
    vistos.add(clave);
    const m = await page.evaluate(medirFoco);
    if (m && m.ratio < 3) malos.push(`${m.nombre} (${m.motivo} ${m.ratio.toFixed(2)})`);
  }
  expect(vistos.size, 'el recorrido con Tab debe pasar por todos los controles').toBeGreaterThanOrEqual(30);
  // Ventana de detalles: el foco va a Cerrar.
  await page.locator('#productos article.producto button').first().focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('dialog#modal-producto')).toBeVisible();
  await page.locator('dialog#modal-producto .cerrar-modal').focus();
  await page.keyboard.press('Shift+Tab'); await page.keyboard.press('Tab');
  const cerrar = await page.evaluate(medirFoco);
  if (cerrar && cerrar.ratio < 3) malos.push(`${cerrar.nombre} (${cerrar.motivo} ${cerrar.ratio.toFixed(2)})`);
  expect(malos).toEqual([]);
});

test('E18 · los objetivos de toque miden al menos 44 × 44 px', async ({ page }) => {
  const enMovil = test.info().project.name !== 'escritorio';
  if (enMovil) await page.getByRole('button', { name: 'Menú' }).click();
  // Lista del plan (A11, A29). Excluidos: enlaces dentro de un párrafo.
  const selectores = [
    'header.encabezado .boton-menu', 'nav[aria-label="Principal"] a', '#inicio a.boton', '#inicio nav.franja a',
    '#productos button.filtro', '#productos article.producto button', '#uso-seguro button',
    '#contacto a.boton', '#contacto a[href^="tel:"]', '#contacto a[href^="mailto:"]', 'footer.pie a',
  ];
  const presentes = await page.evaluate((sels) => sels.filter((sel) => document.querySelector(sel)), ['#inicio nav.franja a', 'footer.pie a']);
  expect(presentes, 'faltan la franja o los enlaces del pie').toHaveLength(2);
  const pequenos = await page.evaluate((sels) => sels.flatMap((sel) => [...document.querySelectorAll(sel)]
    .filter((e) => e.offsetParent !== null)
    .map((e) => ({ sel, r: e.getBoundingClientRect(), t: (e.textContent || e.getAttribute('aria-label') || '').trim().slice(0, 20) }))
    .filter(({ r }) => r.width < 44 || r.height < 44)
    .map(({ sel, r, t }) => `${sel} "${t}" ${Math.round(r.width)}×${Math.round(r.height)}`)), selectores);
  expect(pequenos).toEqual([]);

  await page.locator('#productos article.producto button').first().click();
  const cerrar = await page.locator('dialog#modal-producto').getByRole('button', { name: 'Cerrar' }).boundingBox();
  expect(cerrar.width).toBeGreaterThanOrEqual(44);
  expect(cerrar.height).toBeGreaterThanOrEqual(44);
});
