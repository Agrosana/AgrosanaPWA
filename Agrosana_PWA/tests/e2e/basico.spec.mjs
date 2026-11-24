// E1, E2, E3, E5, E6, E13 (spec 003: CA1, CA2, CA3, CA5, CA6, CA13, CA18)
import { test, expect } from '@playwright/test';
import { prepararCdn, vigilarConsola } from '../apoyo/cdn.mjs';

const soloEscritorio = () => test.skip(test.info().project.name !== 'escritorio', 'se comprueba en 1440 px');

test.beforeEach(async ({ page }) => { await prepararCdn(page); });

test('E1 · /act2/ carga completa sin errores de consola ni recursos rotos @smoke', async ({ page }) => {
  soloEscritorio();
  const problemas = vigilarConsola(page);
  const respuesta = await page.goto('act2/', { waitUntil: 'networkidle' });
  expect(respuesta.status()).toBe(200);
  await expect(page).toHaveTitle(/AgroSana/);
  const imagenesRotas = await page.$$eval('img', (imgs) => imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src));
  expect(imagenesRotas).toEqual([]);
  expect(problemas).toEqual([]);
});

test('E2 · el logotipo y el nombre siguen visibles tras desplazarse', async ({ page }) => {
  await page.goto('act2/');
  const encabezado = page.locator('header.encabezado');
  await page.locator('#contacto').scrollIntoViewIfNeeded();
  await page.mouse.wheel(0, 400);
  await expect(encabezado.getByRole('img', { name: 'AgroSana' })).toBeInViewport();
  await expect(encabezado.getByText('AgroSana', { exact: true })).toBeInViewport();
});

test('E3 · cada enlace del menú lleva a su sección sin salir de la página', async ({ page }) => {
  soloEscritorio();
  await page.goto('act2/');
  const destinos = { Inicio: 'inicio', Nosotros: 'nosotros', Productos: 'productos', 'Uso seguro': 'uso-seguro', Contacto: 'contacto' };
  const menu = page.getByRole('navigation', { name: 'Principal' });
  for (const [texto, id] of Object.entries(destinos)) {
    await menu.getByRole('link', { name: texto, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`/act2/#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
});

test('E5 · el hero tiene título, descripción, imagen con texto alternativo y botón a Productos', async ({ page }) => {
  soloEscritorio();
  await page.goto('act2/');
  const hero = page.locator('#inicio');
  await expect(hero.getByRole('heading', { level: 1 })).toHaveText(/\S.{9,}/);
  await expect(hero.locator('p').first()).toHaveText(/\S.{40,}/);
  const img = hero.locator('img');
  await expect(img).toHaveAttribute('alt', /\S.{9,}/);
  // Panel de etiqueta (system.md): datos de la casa y franja de categorías.
  await expect(hero.locator('dl dt')).toHaveText(['Casa', 'Atención', 'Entrega']);
  const franja = hero.locator('nav.franja a');
  await expect(franja).toHaveText(['Fertilizantes', 'Fungicidas', 'Coadyuvantes', 'Bioestimulantes']);
  for (const a of await franja.all()) await expect(a).toHaveAttribute('href', '#productos');
  const boton = hero.getByRole('link', { name: 'Ver productos' });
  await expect(boton).toHaveAttribute('href', '#productos');
  await boton.click();
  await expect(page.locator('#productos')).toBeInViewport();
});

test('E6 · hay al menos tres secciones de contenido además del hero y contacto', async ({ page }) => {
  soloEscritorio();
  await page.goto('act2/');
  for (const id of ['nosotros', 'productos', 'uso-seguro']) {
    const seccion = page.locator(`section#${id}`);
    await expect(seccion).toHaveCount(1);
    await expect(seccion.getByRole('heading', { level: 2 })).toHaveText(/\S+/);
  }
  await expect(page.locator('section#inicio')).toHaveCount(1);
  await expect(page.locator('section#contacto')).toHaveCount(1);
  // Orden del sistema de diseño, en el documento y en el menú.
  const orden = ['inicio', 'uso-seguro', 'productos', 'nosotros', 'contacto'];
  expect(await page.$$eval('main section[id]', (ss) => ss.map((x) => x.id))).toEqual(orden);
  const menu = page.getByRole('navigation', { name: 'Principal' }).getByRole('link');
  expect(await menu.evaluateAll((as) => as.map((a) => a.getAttribute('href')))).toEqual(orden.map((id) => `#${id}`));
});

test('E13 · el pie muestra empresa, año, enlaces a las secciones y el aviso de la etiqueta', async ({ page }) => {
  soloEscritorio();
  await page.goto('act2/');
  const pie = page.locator('footer.pie');
  await expect(pie).toContainText('AgroSana');
  // Año de la entrega, fijo en el HTML (no el año en que corre el test; R5).
  await expect(pie.locator('.pie-marca')).toHaveText(/©\s?\d{4}\b/);
  await expect(pie).toContainText(/Lee siempre la etiqueta/i);
  // La advertencia abre el pie como barra propia (system.md → Aviso).
  await expect(pie.locator(':scope > .advertencia').first()).toHaveText(/Lee siempre la etiqueta/i);
  expect(await pie.evaluate((f) => f.firstElementChild.classList.contains('advertencia'))).toBe(true);
  for (const id of ['inicio', 'nosotros', 'productos', 'uso-seguro', 'contacto']) {
    await expect(pie.locator(`a[href="#${id}"]`)).toHaveCount(1);
  }
});
