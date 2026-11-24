// E4 (spec 003: CA4, CA18) — menú desplegable en 360 y 768 px; visible en 1440 px.
import { test, expect } from '@playwright/test';
import { prepararCdn, vigilarConsola } from '../apoyo/cdn.mjs';

test.beforeEach(async ({ page }) => { await prepararCdn(page); });

test('E4 · el menú se abre y cierra con el botón, al elegir un enlace y con Esc (≤ 768 px)', async ({ page }) => {
  test.skip(test.info().project.name === 'escritorio', 'en 1440 px el menú no es desplegable');
  const problemas = vigilarConsola(page);
  await page.goto('act2/');
  const boton = page.getByRole('button', { name: 'Menú' });
  const enlaces = page.getByRole('navigation', { name: 'Principal' }).getByRole('link');

  await expect(boton).toBeVisible();
  await expect(boton).toHaveAttribute('aria-expanded', 'false');
  await expect(enlaces.first()).toBeHidden();

  await boton.click();
  await expect(boton).toHaveAttribute('aria-expanded', 'true');
  await expect(enlaces).toHaveCount(5);
  for (const enlace of await enlaces.all()) await expect(enlace).toBeVisible();

  await boton.click();
  await expect(boton).toHaveAttribute('aria-expanded', 'false');
  await expect(enlaces.first()).toBeHidden();

  await boton.click();
  await enlaces.filter({ hasText: 'Contacto' }).click();
  await expect(page).toHaveURL(/#contacto$/);
  await expect(boton).toHaveAttribute('aria-expanded', 'false');
  await expect(enlaces.first()).toBeHidden();

  await boton.click();
  await page.keyboard.press('Escape');
  await expect(boton).toHaveAttribute('aria-expanded', 'false');
  await expect(enlaces.first()).toBeHidden();
  await expect(boton).toBeFocused();

  expect(problemas).toEqual([]);
});

test('E4 · en 1440 px el menú está siempre visible y el botón oculto', async ({ page }) => {
  test.skip(test.info().project.name !== 'escritorio', 'solo en 1440 px');
  await page.goto('act2/');
  await expect(page.getByRole('button', { name: 'Menú' })).toBeHidden();
  const enlaces = page.getByRole('navigation', { name: 'Principal' }).getByRole('link');
  await expect(enlaces).toHaveCount(5);
  for (const enlace of await enlaces.all()) await expect(enlace).toBeVisible();
});
