// E9, E10, E11 (spec 003: CA9, CA10, CA11, CA18)
import { test, expect } from '@playwright/test';
import { prepararCdn, vigilarConsola } from '../apoyo/cdn.mjs';

let problemas;
test.beforeEach(async ({ page }) => {
  problemas = []; // también en los proyectos que se saltan: el afterEach siempre tiene una lista
  test.skip(test.info().project.name !== 'escritorio', 'interacción: se comprueba en 1440 px');
  await prepararCdn(page);
  problemas = vigilarConsola(page);
  await page.goto('act2/');
});
test.afterEach(() => { expect(problemas).toEqual([]); });

const visibles = (page) => page.locator('#productos article.producto:visible');
const filtro = (page, nombre) => page.locator('#productos').getByRole('button', { name: nombre, exact: true });

test('E9 · el filtro muestra solo la categoría elegida, marca el botón y anuncia el total', async ({ page }) => {
  const anuncio = page.locator('#resultado-filtro');
  await expect(anuncio).toHaveAttribute('aria-live', 'polite');
  await expect(visibles(page)).toHaveCount(5);
  await expect(filtro(page, 'Todos')).toHaveAttribute('aria-pressed', 'true');

  const casos = { Fertilizantes: 1, Fungicidas: 1, Coadyuvantes: 2, Bioestimulantes: 1 };
  for (const [nombre, n] of Object.entries(casos)) {
    await filtro(page, nombre).click();
    await expect(visibles(page)).toHaveCount(n);
    for (const p of await visibles(page).all()) await expect(p.locator('.categoria')).toHaveText(nombre);
    await expect(filtro(page, nombre)).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#productos button.filtro[aria-pressed="true"]')).toHaveCount(1);
    await expect(anuncio).toHaveText(`Mostrando ${n} ${n === 1 ? 'producto' : 'productos'}`);
  }
  await filtro(page, 'Todos').click();
  await expect(visibles(page)).toHaveCount(5);
  await expect(anuncio).toHaveText('Mostrando 5 productos');
});

test('E9 · un enlace de la franja lleva a Productos con su categoría ya filtrada', async ({ page }) => {
  await page.locator('#inicio nav.franja').getByRole('link', { name: 'Fungicidas' }).click();
  await expect(page.locator('#productos')).toBeInViewport();
  await expect(filtro(page, 'Fungicidas')).toHaveAttribute('aria-pressed', 'true');
  await expect(visibles(page)).toHaveCount(1);
  await expect(page.locator('#resultado-filtro')).toHaveText('Mostrando 1 producto');
});

test('E9 · una categoría desconocida deja activo "Todos"', async ({ page }) => {
  await filtro(page, 'Fungicidas').click();
  await page.evaluate(() => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'filtro'; b.dataset.categoria = 'plagas'; b.textContent = 'Plagas';
    b.setAttribute('aria-pressed', 'false');
    document.querySelector('#productos button.filtro').parentElement.append(b);
  });
  await filtro(page, 'Plagas').click();
  await expect(visibles(page)).toHaveCount(5);
  await expect(filtro(page, 'Todos')).toHaveAttribute('aria-pressed', 'true');
  await expect(filtro(page, 'Plagas')).toHaveAttribute('aria-pressed', 'false');
});

test('E10 · la ventana de detalles muestra el producto y se cierra con botón, fondo y Esc devolviendo el foco', async ({ page }) => {
  const dialogo = page.locator('dialog#modal-producto');
  const producto = page.locator('#productos article.producto').filter({ hasText: 'Prozycar' });
  const abrir = producto.getByRole('button', { name: /Ver detalles/ });

  const cierres = [
    async () => dialogo.getByRole('button', { name: 'Cerrar' }).click(),
    async () => { const c = await dialogo.boundingBox(); await page.mouse.click(5, 5); expect(c).not.toBeNull(); },
    async () => page.keyboard.press('Escape'),
  ];
  for (const cerrar of cierres) {
    await abrir.click();
    await expect(dialogo).toBeVisible();
    await expect(dialogo).toHaveAttribute('open', '');
    await expect(dialogo.getByRole('heading', { level: 3 })).toHaveText('Prozycar');
    await expect(dialogo.locator('.categoria')).toHaveText('Fungicidas');
    await expect(dialogo.locator('.modal-descripcion')).toContainText('carbendazim');
    await expect(dialogo).toContainText(/Lee y sigue siempre la etiqueta/i);
    await expect(dialogo.locator('img')).toHaveAttribute('src', /prozycar\.jpg$/);
    await expect(dialogo.locator('img')).toHaveAttribute('alt', /Prozycar/);
    await cerrar();
    await expect(dialogo).toBeHidden();
    await expect(abrir).toBeFocused();
  }

  // Como el tablero «Estados» de system.html: cabecera del color de la categoría con su nombre y
  // el botón Cerrar; debajo, foto, nombre, uso y el aviso de la etiqueta.
  await abrir.click();
  const cabecera = dialogo.locator('.modal-cabecera');
  await expect(cabecera.locator('.categoria')).toHaveText('Fungicidas');
  await expect(cabecera.getByRole('button', { name: 'Cerrar' })).toBeVisible();
  const fondoFicha = await producto.locator('.producto-cabecera').evaluate((e) => getComputedStyle(e).backgroundColor);
  expect(await cabecera.evaluate((e) => getComputedStyle(e).backgroundColor)).toBe(fondoFicha);
  const [foto, texto] = await Promise.all([dialogo.locator('img').boundingBox(), dialogo.locator('.modal-texto').boundingBox()]);
  expect(foto.x + foto.width, 'la foto va a la izquierda del texto').toBeLessThanOrEqual(texto.x);
  await page.keyboard.press('Escape');

  // Otro producto: el contenido cambia.
  await page.locator('#productos article.producto').filter({ hasText: 'Frutime' }).getByRole('button', { name: /Ver detalles/ }).click();
  await expect(dialogo.getByRole('heading', { level: 3 })).toHaveText('Frutime');
  await expect(dialogo.locator('.categoria')).toHaveText('Bioestimulantes');
});

test('E11 · Ver más muestra y oculta recomendaciones adicionales', async ({ page }) => {
  const seccion = page.locator('#uso-seguro');
  const boton = seccion.getByRole('button', { name: /Ver más|Ver menos/ });
  const extra = page.locator('#mas-recomendaciones');
  expect(await seccion.locator('li:visible').count()).toBeGreaterThanOrEqual(4);
  await expect(extra).toBeHidden();
  await expect(boton).toHaveText(/Ver más/);
  await expect(boton).toHaveAttribute('aria-expanded', 'false');
  await expect(boton).toHaveAttribute('aria-controls', 'mas-recomendaciones');
  const antes = await seccion.locator('li:visible').count();

  await boton.click();
  await expect(extra).toBeVisible();
  await expect(boton).toHaveText(/Ver menos/);
  await expect(boton).toHaveAttribute('aria-expanded', 'true');
  expect(await seccion.locator('li:visible').count()).toBeGreaterThan(antes);

  await boton.click();
  await expect(extra).toBeHidden();
  await expect(boton).toHaveText(/Ver más/);
  await expect(boton).toHaveAttribute('aria-expanded', 'false');
});
