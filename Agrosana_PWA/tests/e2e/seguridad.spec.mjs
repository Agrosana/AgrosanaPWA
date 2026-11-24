// E16, E17 (spec 003: CA16, CA17; TM1, TM2)
import { test, expect } from '@playwright/test';
import { prepararCdn } from '../apoyo/cdn.mjs';

test.beforeEach(() => { test.skip(test.info().project.name !== 'escritorio', 'seguridad: se comprueba en 1440 px'); });

async function huella(page) {
  return page.evaluate(() => ({
    nodos: document.querySelectorAll('*').length,
    inyectados: document.querySelectorAll('img[src="x"], script:not([src]), [onerror], [onload]').length,
    marcado: window.__xss === true,
  }));
}

test('E16 · el código escrito en la dirección no se interpreta ni se inserta', async ({ page }) => {
  await prepararCdn(page);
  const dialogos = [];
  page.on('dialog', async (d) => { dialogos.push(d.message()); await d.dismiss(); });

  await page.goto('act2/');
  const base = await huella(page);

  const cargas = [
    'act2/#<img src=x onerror="window.__xss=true;alert(1)">',
    'act2/?q=<script>window.__xss=true</script>&categoria=<img src=x onerror=alert(1)>',
    'act2/?categoria=fungicidas"><svg onload=alert(1)>#productos',
  ];
  for (const url of cargas) {
    // Documento nuevo en cada carga: ir de act2/ a act2/#… no vuelve a ejecutar el script.
    await page.goto('about:blank');
    await page.goto(url);
    await page.locator('#productos').waitFor();
    await page.locator('#productos').getByRole('button', { name: 'Fungicidas', exact: true }).click();
    await page.locator('#productos article.producto:visible').first().getByRole('button', { name: /Ver detalles/ }).click();
    await page.keyboard.press('Escape');
    const h = await huella(page);
    expect(h.inyectados).toBe(0);
    expect(h.marcado).toBe(false);
    expect(h.nodos).toBe(base.nodos);
  }
  expect(dialogos).toEqual([]);
});

test('E17 · el navegador rechaza la hoja de iconos si fue alterada', async ({ page }) => {
  const mensajes = [];
  page.on('console', (m) => mensajes.push(m.text()));
  await prepararCdn(page, { alterar: true });
  await page.goto('act2/', { waitUntil: 'networkidle' });
  // La regla añadida al CSS alterado (body{display:none}) no debe aplicarse.
  await expect(page.locator('body')).toBeVisible();
  const contenido = await page.$eval('i[class*="fa-"]', (e) => getComputedStyle(e, '::before').content);
  expect(contenido).toBe('none');
  expect(mensajes.join('\n')).toMatch(/integrity/i);
});
