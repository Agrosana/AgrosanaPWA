---
id: 0005
status: accepted
date: 2026-10-08
---

# ADR 0005 · Pruebas con node:test y Playwright en tests/

## Contexto
La constitución (P2) exige tests automáticos; los requisitos de la práctica son visuales e
interactivos (menú, modal, anchos de pantalla, contraste) y necesitan un navegador real.

## Decisión
`tests/package.json` (fuera de la raíz, para que Vercel no construya) con dependencias de desarrollo:
- `@playwright/test@1.56.0` (publicado 2025-10-06, Apache-2.0, `npm audit` sin vulnerabilidades).
- `@fortawesome/fontawesome-free@6.7.2` (ver ADR 0004) para servir el CDN durante las pruebas.
Se instalan con `npm install --prefix tests --ignore-scripts`. Las reglas estáticas usan `node:test`
(incluido en Node). Un servidor estático propio (`tests/servidor.mjs`) sirve el repo en el puerto 4173.
La primera vez en un equipo nuevo: `npx --prefix tests playwright install chromium`.

## Alternativas consideradas
- Solo verificación manual — no repetible.
- jsdom — no calcula estilos ni anchos reales y no implementa `<dialog>` completo.

## Consecuencias
- Requiere Node 18+ y descargar Chromium una vez para correr los tests localmente.
