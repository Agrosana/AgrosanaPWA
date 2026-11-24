// E7, E8, E12, E14 (spec 003: CA7, CA8, CA12, CA14; TM3)
import { test, expect } from '@playwright/test';
import { prepararCdn } from '../apoyo/cdn.mjs';

test.beforeEach(async ({ page }) => {
  test.skip(test.info().project.name !== 'escritorio', 'contenido: se comprueba en 1440 px');
  await prepararCdn(page);
  await page.goto('act2/');
});

test('E7 · Nosotros tiene al menos tres tarjetas con icono, título y texto', async ({ page }) => {
  const tarjetas = page.locator('#nosotros article.tarjeta');
  expect(await tarjetas.count()).toBeGreaterThanOrEqual(3);
  for (const t of await tarjetas.all()) {
    await expect(t.locator('i[class*="fa-"]')).toHaveCount(1);
    await expect(t.getByRole('heading', { level: 3 })).toHaveText(/\S+/);
    await expect(t.locator('p')).toHaveText(/\S.{20,}/);
  }
});

test('E8 · Productos muestra los cinco productos con foto, nombre, categoría y descripción', async ({ page }) => {
  const esperados = {
    Frutime: 'Bioestimulantes', 'Bio pH': 'Coadyuvantes', 'HydroSpeed CaB-Max': 'Fertilizantes',
    Surfatek: 'Coadyuvantes', Prozycar: 'Fungicidas',
  };
  const productos = page.locator('#productos article.producto');
  await expect(productos).toHaveCount(5);
  // Composición en su propio elemento de la cabecera, solo cuando la etiqueta la da.
  await expect(productos.locator('.producto-cabecera .composicion')).toHaveText(['15-0-0 + 26 CaO + 0.2 B', 'Carbendazim 50 %']);
  for (const [nombre, categoria] of Object.entries(esperados)) {
    const p = productos.filter({ has: page.getByRole('heading', { level: 3, name: nombre, exact: true }) });
    await expect(p).toHaveCount(1);
    await expect(p.locator('.producto-cabecera .categoria')).toHaveText(categoria);
    await expect(p.locator('p.descripcion')).toHaveText(/\S.{25,}/);
    const img = p.locator('img');
    await expect(img).toHaveAttribute('alt', new RegExp(nombre.split(' ')[0], 'i'));
    expect(await img.evaluate((i) => i.complete && i.naturalWidth > 0)).toBe(true);
  }
});

test('E12 · Contacto: llamar con un toque, correo con asunto, horario, nota de ejemplo y sin formularios', async ({ page }) => {
  const contacto = page.locator('#contacto');
  await expect(contacto.locator('a[href^="tel:"]')).toHaveAttribute('href', 'tel:+527550000000');
  await expect(contacto.locator('a[href^="mailto:"]').first()).toHaveAttribute('href', /^mailto:contacto@agrosana\.com/);
  const asesoria = contacto.getByRole('link', { name: 'Solicitar asesoría' });
  await expect(asesoria).toHaveAttribute('href', 'mailto:contacto@agrosana.com?subject=Solicitud%20de%20asesor%C3%ADa');
  await expect(contacto).toContainText('Zihuatanejo, Guerrero');
  await expect(contacto).toContainText(/Lunes a sábado/i);
  await expect(contacto).toContainText('Datos de contacto de ejemplo para la práctica.');
  for (const icono of ['fa-phone', 'fa-envelope', 'fa-location-dot', 'fa-clock']) {
    await expect(contacto.locator(`i.${icono}`)).toHaveCount(1);
  }
  await expect(page.locator('form, input, textarea, select')).toHaveCount(0);
});

test('E14 · los iconos se dibujan con la fuente de Font Awesome', async ({ page }) => {
  await page.waitForFunction(() => document.fonts.check('900 16px "Font Awesome 6 Free"'));
  const iconos = await page.$$eval('i[class*="fa-"]', (els) => els.map((e) => {
    const antes = getComputedStyle(e, '::before');
    return { clase: e.className, fuente: antes.fontFamily, contenido: antes.content };
  }));
  expect(iconos.length).toBeGreaterThanOrEqual(10);
  for (const i of iconos) {
    expect(i.fuente, i.clase).toMatch(/Font Awesome 6/);
    expect(i.contenido, i.clase).not.toBe('none');
  }
});
