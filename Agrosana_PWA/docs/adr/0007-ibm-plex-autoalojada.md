---
id: 0007
status: accepted
date: 2026-10-09
---

# ADR 0007 · Tipografía IBM Plex autoalojada en `act2/fonts/`

## Contexto
El sistema de diseño aprobado (`docs/design/system.md`, opción A · La etiqueta) usa IBM Plex Sans
Condensed para títulos e IBM Plex Sans para texto. Las fuentes del sistema ya no valen como
tipografía de marca (plugin ai-dd 1.11.3, `design.md` §2.4.3) y la constitución (P4) no permite
recursos externos sin ADR; P3 exige que `act2/` se sirva tal cual, sin build.

## Decisión
`act2/fonts/` contiene estos archivos (subconjunto latino, woff2), copiados sin modificar de los
paquetes `@fontsource/ibm-plex-sans-condensed@5.3.0` y `@fontsource/ibm-plex-sans@5.3.0`, más
`OFL.txt` con la licencia:

| Archivo | Bytes | sha256 |
|---|---|---|
| `ibm-plex-sans-condensed-latin-700-normal.woff2` | 19352 | `4768878c107d92c528a65bba206a87cdcf2c694514e75907fb91772cf8a388a5` |
| `ibm-plex-sans-latin-400-normal.woff2` | 22588 | `3b646991d30055a93a4ecc499713d4347953a74a947ecab435ab72070cbdab0e` |
| `ibm-plex-sans-latin-600-normal.woff2` | 24252 | `8960851d691c054ed38e259bdcf1a6190d157b4203ed5bb32c632a863fb8ec2f` |
| `ibm-plex-sans-latin-700-normal.woff2` | 22832 | `42e7b0c143c19df9d99fd896e76b48f846edf0902d200bc29796b34d12c33aa7` |

`css/estilos.css` las declara con `@font-face` (`font-display: swap`) y rutas relativas
(`../fonts/…`); `index.html` precarga la 400 y la condensada 700. Los paquetes **no** se añaden a
`tests/package.json`: se descargan una vez con `npm pack` en una carpeta temporal, se comprueban
las huellas de esta tabla y se copian.

Verificación (`shared/agent-security.md` §2): ambos paquetes existen en npm desde 2020; la versión
5.3.0 se publicó el 2026-07-19; licencia OFL-1.1 (IBM Corp.); sin scripts de instalación;
repositorio fuente `github.com/fontsource/font-files` (proyecto Fontsource; mantenedores
en npm `jwr1` y `lotusdevshack`); `@fontsource/ibm-plex-sans` tuvo 1 323 292 descargas del
2026-10-01 al 2026-10-07 (api.npmjs.org); integridad del paquete:
- `@fontsource/ibm-plex-sans@5.3.0`: `sha512-CbE4CbbEEZJX860XyUiRpsksXIQR8Rp2XDva2VO53NJox9tVNtusrysd2x5YkUEY3ErQ66W1IiiQL8/wihhw5w==`
- `@fontsource/ibm-plex-sans-condensed@5.3.0`: `sha512-fQyBpwbkguP4azjq7Cw8h/J3C/d8MFAzXOiSoFxyKCUK4x0XKrWEh3tGdTxhDM0HctVRQilQo1zGoyxDHLm5jQ==`

`act2/fonts/` es una carpeta adicional permitida: P3 fija la estructura **mínima** de una
actividad, no la máxima (el argumento de ADR 0004 contra copiar Font Awesome era su tamaño, ~1 MB,
y su número de carpetas, no la existencia de una carpeta más).

## Alternativas consideradas
- Google Fonts — recurso externo con seguimiento de terceros; exigiría ampliar la lista de P4.
- Fuentes del sistema (Bahnschrift, Segoe) — varían por equipo y ya no valen como marca.
- Fuente variable completa — más peso (> 150 KB) para los mismos cuatro estilos.

## Consecuencias
- ~89 KB de fuentes servidos desde el mismo origen; con conexión lenta el texto aparece primero
  con `sans-serif`.
- Cambiar de versión o añadir pesos exige actualizar la tabla de huellas y `system.md`.
