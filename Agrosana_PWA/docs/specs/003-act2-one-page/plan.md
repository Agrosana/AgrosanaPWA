---
spec: 003-act2-one-page
status: approved   # re-aprobado por el usuario el 2026-10-09 tras --fix (/analyze ronda 3)
constitution_version: 1.1.0
created: 2026-10-08
---

# Plan · 003 Actividad 2: aplicación web One Page de AgroSana

## Enfoque técnico
Una sola página estática en `act2/` (HTML semántico + una hoja `css/estilos.css` + un script
`js/app.js` sin dependencias) que se sirve tal cual desde Vercel. El contenido de los productos vive
en el HTML (no se genera con JavaScript), de modo que la página funciona y se indexa aunque el script
falle; el JavaScript solo añade comportamiento: menú móvil, filtro por categoría, ventana modal con
`<dialog>` y "Ver más". Los iconos son de Font Awesome 6.7.2 desde cdnjs con SRI. Las pruebas viven
en `tests/` con su propio `package.json`: reglas estáticas con `node:test` (estructura, sinks,
emojis, recursos externos) y comportamiento con Playwright sobre un servidor estático propio en Node,
interceptando el CDN para servirlo desde el paquete npm de Font Awesome (mismo archivo, misma huella),
lo que además permite probar que un archivo alterado se rechaza.
El aspecto sale del **sistema de diseño aprobado** (`docs/design/system.md`, opción A · La etiqueta con
IBM Plex): `estilos.css` copia sus tokens en `:root` y no usa ningún valor literal fuera de ellos
(P12), y las fuentes IBM Plex se sirven desde `act2/fonts/` sin CDN.

## Constitution Check
| Principio | Resultado | Justificación / ajuste | Cómo se verifica |
|---|---|---|---|
| P1 Ninguna implementación sin spec aprobada | ✅ | Spec 003 `approved` el 2026-10-08 | manual: `/review` con `scope.md` (todo archivo cambiado tiene tarea) |
| P2 Test antes del código | ✅ | Fase de tests (T010–T019, T028 y T029) antes de la implementación (T020–T027); cada tarea de implementación `depende:` de su test | test: `npm test --prefix tests`; nota "falló antes" por tarea en `/implement` |
| P3 Estructura de actividad | ✅ | `act2/index.html`, `act2/css/estilos.css`, `act2/js/app.js`, `act2/img/`; rutas relativas; sin build | test: `tests/unit/estructura.test.mjs` (U1, U5) |
| P4 Dependencias registradas | ✅ | Ejecución: solo Font Awesome por CDN con `integrity` (ADR 0004); las fuentes IBM Plex son archivos propios en `act2/fonts/`, no un recurso externo (ADR 0007). Desarrollo: `@playwright/test` y `@fortawesome/fontawesome-free` en `tests/` (ADR 0005) | test: U2 (lista de recursos externos aprobados con `integrity`) · E19 (ninguna petición de fuentes fuera del sitio) |
| P5 Solo Font Awesome, sin emojis | ✅ | Iconos `<i class="fa-solid …" aria-hidden="true">` | test: U3 (rangos Unicode de emoji) y E14 (iconos renderizados con la fuente de Font Awesome) |
| P6 Responsivo 360/768/1440 | ✅ | Diseño fluido con rejilla de 1/2/3 columnas y menú desplegable por debajo de 1024 px (incluye 768) | test: E15 (`scrollWidth` ≤ ancho y nº de columnas por ancho), E4 (menú en 360) · manual: capturas en los tres anchos |
| P7 Accesibilidad AA | ✅ | `alt` descriptivos, contraste de los tokens de `system.md` (todos los pares ≥ 4.5:1), `<dialog>` modal con `Esc` y retorno de foco, `aria-expanded`, `aria-pressed`, región `aria-live`, objetivos ≥ 44 px, `:focus-visible` | test: E18 (alt, contraste calculado ≥ 4.5:1, foco visible, objetivos ≥ 44 px), E10 (Esc y retorno de foco), E4 (`aria-expanded`) |
| P8 Sin PWA | ✅ | No se crean `manifest.json` ni Service Worker | test: U1 (no existen y no hay `serviceWorker` en el JS) |
| P9 Sin secretos ni sinks | ✅ | El JS solo usa `textContent`, `hidden`, `classList`, atributos y `<dialog>`; no hay formularios | test: U4 (sinks, `action` externos, `<form>`) · `gitleaks detect --no-banner --redact` |
| P10 Sin errores de consola ni recursos rotos | ✅ | Todas las imágenes existen en `act2/img/` | test: E1 (escucha `console`, `pageerror` y respuestas ≥ 400) |
| P11 Producción solo con aprobación humana | ✅ | `/release` se detiene en T096; el push a `main` lo hace el usuario | manual: registro bajo T096 |
| P12 Solo el sistema de diseño | ✅ | `estilos.css` declara en `:root` los tokens de `system.md` con sus mismos valores; el resto de reglas usa solo `var(--…)` (sin colores, tamaños con unidad salvo `0` y `1px`, ni `font-family` literales) y sin estilos en línea en `index.html` | test: U6 (solo tokens, con control positivo) y U7 (tokens de `:root` = tabla Color y Tipografía de `system.md`) · manual: capturas contra `system.html` |

## Cambios por módulo
| Módulo | Cambio | Riesgo |
|---|---|---|
| `act2/index.html` (nuevo; rehacer la maqueta de T021) | Página única con los componentes del sistema y su orden: encabezado fijo con logotipo y menú; `#inicio` (panel de etiqueta + franja de categorías), `#uso-seguro` (bloque de precauciones), `#productos`, `#nosotros`, `#contacto`; advertencia; `<dialog id="modal-producto">`; pie; `<link rel="preload">` de las dos fuentes del primer pintado | medio (el contenido de T021 se reordena; los tests ya escritos siguen valiendo) |
| `act2/css/estilos.css` (nuevo) | `@font-face` de IBM Plex (`font-display: swap`); tokens de `system.md` en `:root`; componentes del sistema; rejillas 1/2/3; momento firma de la franja; `:focus-visible`; `prefers-reduced-motion` | medio (desbordes en 360 px; P12 exige cero literales) |
| `act2/fonts/` (nuevo) | `ibm-plex-sans-condensed-latin-700-normal.woff2`, `ibm-plex-sans-latin-{400,600,700}-normal.woff2` y `OFL.txt`, copiados de `@fontsource` 5.3.0 con su huella sha256 (ADR 0007) | bajo |
| `act2/js/app.js` (nuevo) | Menú móvil, filtro con anuncio, modal de detalle, "Ver más"; sin dependencias | medio (accesibilidad del diálogo) |
| `act2/img/` (nuevo) | Copia de `antiguo/img/producto1-5.jpg` con nombres descriptivos y `logo.svg`. `campo.svg` (T020) deja de usarse: el hero muestra la foto de HydroSpeed CaB-Max (sistema → Panel de etiqueta) y el archivo se elimina | bajo |
| `docs/design/system.md`, `system.html` | Versión 1.1.0 con los tokens de "Cambios a incorporar al sistema" (A18) y la fila `implícita` de valores tipográficos con su documento de origen (A23) | bajo (no versionado) |
| `tests/` (nuevo) | `package.json`, `playwright.config.mjs`, `servidor.mjs`, `apoyo/cdn.mjs`, `unit/estructura.test.mjs` (+ U6, U7 y huellas de fuentes en U1), `unit/tokens-sistema.json` (copia versionada de los tokens), `e2e/*.spec.mjs` (E5, E6, E8, E13, E15 y E18 ajustados; + `e2e/sistema.spec.mjs`: E19, E20) | bajo |
| `.gitignore` | Ya ignora `tests/node_modules/`, resultados de Playwright | — |

## Contratos y datos
**Pantalla única** (`act2/index.html`), de arriba abajo, con los componentes de
`docs/design/system.md` (vista de referencia: `system.html#inicio-m`, `#inicio-t`, `#inicio-d` y
`#estados`). Los valores que la página necesita y el sistema 1.0.0 aún no nombra se incorporan
primero al sistema (A18), en la primera tarea de `/tasks`:

**Cambios a incorporar al sistema** (`system.md` 1.0.0 → 1.1.0, con su fila en "Decisiones", y
`system.html` regenerado con ellos):

| Token nuevo | Valor | Uso | Motivo |
|---|---|---|---|
| `--color-on-dark` | `#FFFFFF` | Enlaces del pie | Literal en la opción A |
| `--color-text-on-dark` | `#E7ECE6` | Texto del pie (15.29:1 sobre `--color-text`) | Literal en la opción A |
| `--color-backdrop` | `rgba(17, 22, 17, 0.72)` | Fondo del diálogo | Literal en `system.md` → Diálogo |
| `--size-icon` / `--size-icon-lg` | 24px / 40px | Iconos en línea / dentro de los pictogramas | Literales de la opción A |
| `--size-picto` | 72px | Caja del pictograma de precaución | Literal |
| `--size-franja` | 72px | Alto mínimo de la franja de categorías | Literal |
| `--size-aviso` | 64px | Alto mínimo de la advertencia | Literal |
| `--size-logo` | 48px | Logotipo | Literal |
| `--size-menu-row` | 52px | Filas del menú del teléfono | `system.md` → Navegación |
| `--size-foto` | 200px | Alto de la foto en la ficha (`object-fit: contain`) | `system.md` → Ficha (A26) |
| `--size-foto-hero` | 260px | Alto máximo de la foto del hero, menor que su alto natural (287 px): nunca se amplía | A26 |
| `--focus-width` / `--focus-offset` | 3px / 3px | Anillo de foco | `system.md` → Botón |
| `--measure-text` / `--measure-note` | 54ch / 46ch | Ancho máximo del párrafo del hero / subtítulos de sección | Literales |
| `--space-gutter-m` | 16px | Margen lateral por debajo de 768 px | `system.md` → Espaciado |
| `--leading-body` / `--leading-tight` / `--leading-brand` | 1.55 / 1 / .9 | Interlineados de texto, títulos de sección y marca | Literales sin nombre |

Las proporciones de rejilla (`fr`), los porcentajes de maquetación (`100%`, `50%`) y los pasos de
`@keyframes` no son valores visuales de P12 (color, tipografía, espaciado, radio, sombra, duración)
y se quedan en el CSS.

| Zona | Componente del sistema | Contenido | Estados / comportamiento |
|---|---|---|---|
| Encabezado `header.encabezado` (`position: sticky`, siempre visible) | Navegación y menú del teléfono | `img/logo.svg` (alt "AgroSana") + nombre "AgroSana" + lema "El agricultor"; `nav` con enlaces `#inicio`, `#uso-seguro`, `#productos`, `#nosotros`, `#contacto` (orden de la página); botón `.boton-menu` (icono `fa-bars`/`fa-xmark`, `aria-controls="menu"`, `aria-expanded`) | < 1024 px: menú oculto hasta pulsar el botón; filas de `--size-menu-row`; se cierra al elegir enlace o con `Esc` (A5: probado en E4); ≥ 1024 px: menú siempre visible y botón oculto. Marcar la sección actual queda fuera de esta spec (A28) |
| `#inicio` | Panel de etiqueta + franja de categorías | h1 "Insumos para el campo de la Costa Grande", párrafo, botón primario "Ver productos" → `#productos`; `figure` con `img/hydrospeed-cab-max.jpg` (alt "Saco de HydroSpeed CaB-Max, fertilizante soluble con calcio y boro") y pie; `dl` Casa / Atención / Entrega; `nav.franja` con cuatro enlaces de categoría → `#productos` | Momento firma: la franja se imprime de izquierda a derecha al cargar (`clip-path`, `--duration-base`); con `prefers-reduced-motion: reduce`, completa desde el inicio |
| `#uso-seguro` | Bloque de precauciones | Barra amarilla "Precauciones antes de aplicar cualquier producto"; 4 recomendaciones con pictograma (`fa-book-open`, `fa-mask-face`, `fa-wind`, `fa-lock`) + 3 en `ul#mas-recomendaciones[hidden]`; botón secundario "Ver más precauciones"/"Ver menos precauciones" con `aria-expanded` y `aria-controls` | — |
| `#productos` | Filtro + fichas de producto | Botones `button.filtro[data-categoria]` (Todos, Fertilizantes, Fungicidas, Coadyuvantes, Bioestimulantes) con `aria-pressed` en un `role="group"`; `p#resultado-filtro[aria-live=polite]` "Mostrando N productos"; 5 `article.producto[data-categoria]` con cabecera del color de su categoría (`.categoria` con solo el nombre de la categoría, como exige E8, y la composición, si la hay, en un `span.composicion` aparte), nombre, foto, descripción y botón "Ver detalles" | Un botón con `data-categoria` fuera de la lista conocida deja activo "Todos" (A5: probado en E9). Estado vacío del sistema: no se alcanza con los 5 productos y sus 4 categorías; se documenta, no se implementa |
| `<dialog id="modal-producto" aria-labelledby>` | Diálogo de detalles | Cabecera del color de la categoría con su nombre y botón cerrar (`fa-xmark`, `aria-label="Cerrar"`, 48 px); imagen, nombre (h3), "Para qué sirve", aviso "Lee y sigue siempre la etiqueta…" | Abre con `showModal()`; cierra con botón, clic en el fondo o `Esc`; devuelve el foco al botón de origen. Datos tomados del propio `article` con `textContent` |
| `#nosotros` | Tarjetas de Nosotros | 3 `article.tarjeta` desiguales (CA7), cada una con icono, `h3` y texto: Asesoría en campo (`fa-user-tie`, doble ancho, fondo verde, su `h3` con el tamaño `--text-h2`), Marcas reconocidas (`fa-award`), Entrega en la región (`fa-truck`) | — |
| `#contacto` | Contacto ("Distribuye: AgroSana") | Teléfono `tel:+527550000000`, correo `mailto:contacto@agrosana.com`, ubicación y horario con iconos; botón primario "Solicitar asesoría" → `mailto:contacto@agrosana.com?subject=Solicitud%20de%20asesor%C3%ADa`; nota visible "Datos de contacto de ejemplo para la práctica." (A10, decisión del usuario 2026-10-08) | Sin formularios |
| Advertencia + `footer.pie` | Aviso y pie | Barra amarilla "Lee siempre la etiqueta antes de usar cualquier producto."; pie con nombre, año y enlaces a secciones (≥ 48 px) | — |

**Productos** (contenido fijo en el HTML):

| Producto | Archivo | Categoría | Descripción breve |
|---|---|---|---|
| Frutime | `img/frutime.jpg` | Bioestimulantes | Regulador de crecimiento que favorece la floración y el amarre de fruto |
| Bio pH | `img/bio-ph.jpg` | Coadyuvantes | Acidificante, dispersante y humectante para el agua de aplicación |
| HydroSpeed CaB-Max | `img/hydrospeed-cab-max.jpg` | Fertilizantes | Fertilizante soluble con calcio y boro (15-0-0 + 26 CaO + 0.2 B) |
| Surfatek | `img/surfatek.jpg` | Coadyuvantes | Surfactante que mejora la cobertura de la aspersión sobre la hoja |
| Prozycar | `img/prozycar.jpg` | Fungicidas | Fungicida en polvo humectable a base de carbendazim al 50 % |

**Tokens de diseño:** los de `docs/design/system.md` (Color, Tipografía, Espaciado, Movimiento),
copiados con sus mismos valores en `:root` de `estilos.css`, incluidos los de móvil
(`--text-h1-m`, `--text-h2-m`, `--text-label-m`) que se aplican con `@media (max-width: 767px)`.
Los colores de categoría (`--color-cat-*`) son los mismos que tenía este plan.

**Tipografía:** IBM Plex Sans Condensed 700 (títulos, marca, franja, avisos) e IBM Plex Sans
400/600/700 (texto, botones, filtros) desde `act2/fonts/` con `@font-face` y `font-display: swap`;
pila de respaldo `sans-serif`. Se precargan `ibm-plex-sans-latin-400-normal.woff2` e
`ibm-plex-sans-condensed-latin-700-normal.woff2` (primer pintado) con
`<link rel="preload" href="fonts/…" as="font" type="font/woff2" crossorigin>`, en el mismo cambio que
el `@font-face` que las usa (sin `crossorigin`, o sin una regla que la use, Chromium avisa en consola
y E1 falla: A21). Ningún texto bajo 16 px.

**Rejilla:** fichas de producto en 1 columna < 600 px, 2 de 600 a 1023 px y 3 desde 1024 px;
Nosotros en 1 / 2 (la primera a todo el ancho) / 3 columnas (2fr 1fr 1fr); pictogramas de
precaución 1 / 2 / 4; franja 2 × 2 por debajo de 1024 px. Menú desplegable por debajo de 1024 px.
En la página real los cortes son `@media` sobre el ancho de la ventana (equivalen a los
`@container` del canvas y de `system.html`).

Revisar con `design:design-handoff` antes de `/implement` (nota de la primera tarea, A35) y usar
`design:ux-copy` para los textos de estado (skill `design` habilitada).

## Estrategia de pruebas
- **Reglas estáticas** (`node --test tests/unit`, sin navegador): U1 estructura y ausencia de PWA y de `package.json` en la raíz; U2 recursos externos solo de la lista aprobada y con `integrity` + `crossorigin`; U3 sin emojis e iconos `fa-` presentes; U4 sin sinks peligrosos, `console.*`, `<form>` ni `action` externos; U5 rutas internas relativas; **U6 solo tokens (P12)** (A19): son bloque de tokens todos los `:root`, también dentro de `@media`; quedan fuera de la búsqueda los bloques `@font-face`, las condiciones de `@media`, los selectores de `@keyframes` y los comentarios. En el resto de `estilos.css` cuenta como literal: un color (`#…`, `rgb(`, `hsl(`, nombre de color salvo `transparent`, `currentColor` e `inherit`); una longitud en `px`, `rem`, `em`, `ch`, `vw` o `vh` salvo `0` y `1px`; una duración en `ms` o `s` distinta de `0s`; un `font-family` que no empiece por `var(` (patrón `font-family\s*:(?!\s*var\()`); y un `font-size`, `font-weight`, `line-height` o `letter-spacing` que no sea `var(…)` o `inherit`. No cuentan los `fr`, los `%` de maquetación ni los números sin unidad de `flex`, `order` o `z-index`. `index.html` no tiene atributos `style`. Cada clase de literal con un control positivo (el patrón detecta un ejemplo). **U7 tokens = sistema** (A25): compara `:root` de `estilos.css` con `tests/unit/tokens-sistema.json` (copia versionada de **todas** las tablas de tokens de `system.md`) y, si `docs/` existe, comprueba además que esa copia coincide con `system.md`; sin `docs/` lo dice en un aviso, pero la comparación con la copia corre siempre. U1 comprueba además que las cuatro fuentes de `act2/fonts/` existen con las sha256 de ADR 0007 (A36) y que `img/campo.svg` ya no está.
- **Navegador** (Playwright 1.56 + Chromium, `tests/e2e`): servidor estático `tests/servidor.mjs` en el puerto 4173 sirviendo la raíz del repo; `apoyo/cdn.mjs` intercepta cdnjs y sirve los archivos de `@fortawesome/fontawesome-free@6.7.2` (el sandbox de pruebas no tiene salida a cdnjs; comprobado con una prueba de concepto el 2026-10-08). Proyectos con viewport 360×740, 768×1024 y 1440×900 para E15; el resto en 1440 salvo E4 (360). Etiqueta `@smoke` en E1. **Modo `BASE_URL` (A6):** si la variable `BASE_URL` está definida, la configuración no levanta `webServer` y `apoyo/cdn.mjs` no intercepta cdnjs (se prueba el CDN real). Comando único de smoke: `BASE_URL=<url> npm run smoke --prefix tests` (script `smoke` = `playwright test --project=escritorio --grep @smoke`).
- **Consola durante las interacciones (A3):** E4, E9, E10 y E11 fallan ante cualquier `console.error` o `pageerror`.
- **Objetivos de toque ≥ 44×44 px (A11, A29):** botón de menú, enlaces del menú, botón del hero, enlaces de la franja, filtros, "Ver detalles", cerrar del modal, "Ver más precauciones", "Solicitar asesoría", enlaces `tel:`/`mailto:` de contacto y enlaces del pie (el sistema les da `--touch-min`). Excluidos: enlaces dentro de un párrafo.
- Los tests de navegador nuevos se ejecutan dos veces (contrato → "Tests inestables").
- **Sistema en pantalla** (`tests/e2e/sistema.spec.mjs`): **E19** la fuente consta como cargada (`document.fonts` con `IBM Plex Sans` e `IBM Plex Sans Condensed` en `status: loaded`; `document.fonts.check()` no sirve), las de IBM Plex se piden a `/act2/fonts/` y toda petición de fuente es de `/act2/fonts/` o del prefijo de Font Awesome aprobado en ADR 0004 (A20); **E20** con `reducedMotion: 'reduce'` la franja de categorías está completa al cargar (sin `clip-path` pendiente) y, sin esa preferencia, termina completa tras `--duration-base`.
- **Ajustes a tests existentes** (tarea de test antes de T027 y T022, A17, A22, A29): **E15** mide las columnas de la rejilla (`getComputedStyle(…).gridTemplateColumns`) de `#productos` y `#nosotros` (1 / 2 / 3 a 360 / 768 / 1440 px), no las tarjetas de la primera fila (decisión del usuario, 2026-10-09); **E6** comprueba el orden de las secciones en el DOM y del menú (Inicio, Uso seguro, Productos, Nosotros, Contacto); **E5** comprueba en `#inicio` la `nav.franja` con 4 enlaces a `#productos` y la `dl` Casa / Atención / Entrega; **E13** comprueba la advertencia "Lee siempre la etiqueta…" antes del pie; **E8** comprueba en cada ficha la cabecera con su `.categoria`; **E18** añade a la lista de objetivos ≥ 44 px `footer.pie a` y `nav.franja a`.
- E18 calcula el contraste en pantalla; U7 garantiza que los tokens son los de `system.md`, cuyos pares ya están calculados (todos ≥ 4.5:1).
- Verificación manual: capturas en 360, 768 y 1440 px contra `docs/design/system.html` (`#inicio-m`, `#inicio-t`, `#inicio-d`) y el tablero `#estados`, confirmadas por el usuario.

## Modelo de amenazas
Aplica: la página tiene entradas externas (la dirección URL) y carga un recurso de terceros.

| ID | Amenaza (STRIDE) | Categoría OWASP | Componente | Control | Test |
|---|---|---|---|---|---|
| TM1 | Tampering: un CDN comprometido sirve CSS alterado | A08:2025 Software and Data Integrity Failures | `<link>` de Font Awesome | `integrity="sha512-Evv84Mr4…"` + `crossorigin="anonymous"` + `referrerpolicy="no-referrer"` | E17 (archivo alterado → rechazado) · U2 |
| TM2 | Tampering/XSS: código en el ancla o parámetros de la URL que la página inserte | A05:2025 Injection | `js/app.js` | El JS no lee `location` para generar contenido; solo `textContent`; sin sinks | E16 (URL con carga → sin nodos inyectados ni diálogos) · U4 |
| TM3 | Information disclosure: la página recoge datos personales sin aviso | A06:2025 Insecure Design | `#contacto` | Sin formularios; contacto por `tel:` y `mailto:` que abre el cliente del propio visitante | E12 · U4 |

## Trazabilidad
| Criterio de aceptación | Cambio(s) | Test(s) |
|---|---|---|
| CA1: estructura en act2, sin build | `act2/*`, raíz sin `package.json` | unit U1, U5 · e2e E1 (`/act2/` responde 200 y carga todo) |
| CA2: logotipo y nombre siempre visibles | `index.html` encabezado, `estilos.css` (`position: sticky`) | e2e E2 (en 360, 768 y 1440 px) |
| CA3: menú con anclas internas | `index.html` nav | e2e E3 |
| CA4: menú móvil ≤ 768 px (desplegable por debajo de 1024 px) | `index.html`, `estilos.css`, `app.js` (menú) | e2e E4 (360 y 768 px; `Esc`; visible en 1440) |
| CA5: hero con título, descripción, imagen y botón | `index.html` `#inicio` (panel de etiqueta), `img/hydrospeed-cab-max.jpg` | e2e E5 (con franja y `dl`) · verificación manual: `#inicio` a 360/768/1440 px contra `system.html` |
| CA6: tres secciones de contenido | `index.html` (orden del sistema: Uso seguro, Productos, Nosotros) | e2e E6 (con orden) |
| CA7: tres tarjetas en Nosotros | `index.html`, `estilos.css` (tarjetas desiguales del sistema) | e2e E7 · verificación manual: `#nosotros` contra `system.html` |
| CA8: cinco productos con foto, nombre, categoría y descripción | `index.html`, `img/*.jpg` | e2e E8 |
| CA9: filtro por categoría con anuncio | `index.html`, `app.js` (filtro) | e2e E9 |
| CA10: modal de detalle con cierre y retorno de foco | `index.html` `<dialog>`, `app.js` (modal), `estilos.css` | e2e E10 |
| CA11: Ver más / Ver menos | `index.html`, `app.js` (ver más) | e2e E11 |
| CA12: contacto con tel, correo prellenado y sin datos personales | `index.html` `#contacto` | e2e E12 (incluye la nota de datos de ejemplo) · unit U4 |
| CA13: pie de página | `index.html` `footer` | e2e E13 |
| CA14: solo iconos Font Awesome, sin emojis | `index.html` | unit U3 · e2e E14 |
| CA15: responsivo 360/768/1440 | `estilos.css` | e2e E15 (columnas de las rejillas de `#nosotros` y `#productos`) · verificación manual: capturas en 360, 768 y 1440 px contra `docs/design/system.html` |
| CA16 (abuso): código en la URL no se interpreta | `app.js` | e2e E16 · unit U4 |
| CA17 (abuso): recurso alterado rechazado | `index.html` `<link integrity>` | e2e E17 · unit U2 |
| CA18: consola limpia y sin recursos rotos | todo `act2/` | e2e E1, E4, E9, E10, E11 (vigilan consola) · unit U4 (sin `console.*`) |
| TM1 | `<link integrity>` | e2e E17 |
| TM2 | `app.js` | e2e E16 |
| TM3 | `#contacto` | e2e E12 |
| RNF: accesibilidad WCAG 2.1 AA básica | `index.html`, `estilos.css`, `app.js` | e2e E18 (alt, contraste, foco visible, objetivos ≥ 44 px) · E10 · E4 |
| RNF: utilizable en 360/768/1440 | `estilos.css` | e2e E15 |
| RNF: sin errores de consola | `act2/` | e2e E1 |
| RNF: interfaz solo con el sistema de diseño (P12) | `estilos.css`, `index.html` | unit U6, U7 |
| RNF: tipografía de marca autoalojada y cargada | `act2/fonts/`, `estilos.css` | unit U1 · e2e E19 |
| RNF: un solo momento animado, con versión sin movimiento | `estilos.css` (franja) | e2e E20 · verificación manual: tablero `#estados` de `system.html` |

## Observabilidad
No aplica: la spec no toca datos sensibles, autenticación ni permisos, y el sitio no tiene servidor
propio. Única medida: el JS nuevo no escribe en consola (OB1.a, test U4); tras el deploy se revisa
que Vercel no registre respuestas 404 para `/act2/*`.

## Rollout
- Feature flag: no aplica (página nueva en una ruta nueva; no cambia ningún flujo existente).
- Orden de despliegue: un solo paso; push de la rama `release/v1.0.0` → Preview (staging) → push a `main` → producción.
- Compatibilidad: `antiguo/` y `act2/` conviven; nada de lo existente cambia.
- Rollback: Vercel → Deployments → Instant Rollback al despliegue anterior; `git revert` de los commits de la versión y push a `main`.
- Métricas a vigilar tras el deploy: `/act2/` responde 200 por HTTPS, E1 `@smoke` contra la URL de producción en verde, sin 404 en los logs de Vercel durante 15 minutos.

## Decisiones (→ ADR si son arquitectónicas)
- **Font Awesome por CDN (cdnjs 6.7.2, CSS `all.min.css`) con SRI** frente a descargarlo dentro de `act2/` o usar el kit de fontawesome.com. El CDN mantiene `act2/` con la estructura mínima; el kit exige cuenta y script de terceros. Verificación (`shared/agent-security.md` §2): paquete `@fortawesome/fontawesome-free@6.7.2`, publicado 2024-12-16, licencias CC-BY-4.0 / OFL-1.1 / MIT, sin scripts de instalación; huella sha512 calculada del paquete y coincidente con la de cdnjs. **→ ADR 0004**.
- **Playwright 1.56.0 + `node:test`** frente a solo verificación manual o jsdom: el menú, el `<dialog>`, el contraste y los anchos necesitan un navegador real. `@playwright/test@1.56.0` publicado 2025-10-06, Apache-2.0, `npm audit` 0 vulnerabilidades, se instala con `--ignore-scripts` (los navegadores no se descargan en la instalación). `@fortawesome/fontawesome-free@6.7.2` como dependencia de desarrollo para servir el CDN en las pruebas. **→ ADR 0005**.
- **Contenido en HTML, JS solo de comportamiento** frente a generar las tarjetas desde un arreglo en JS: menos código, sin sinks y la página se ve completa sin JavaScript.
- **`<dialog>` nativo** frente a un `div` con `role="dialog"`: trae `Esc`, fondo inerte y foco gestionado por el navegador.
- **Contacto sin formulario** (spec, supuesto RS1.a): `tel:` y `mailto:` con asunto prellenado.
- **Sistema de diseño aprobado** (opción A · La etiqueta con IBM Plex; ronda 3 y ronda de tipografía de 2026-10-09): sustituye los tokens, la tipografía del sistema (Bahnschrift) y la ilustración `campo.svg` que tenía este plan (decisión del usuario, 2026-10-09).
- **IBM Plex autoalojada en `act2/fonts/`** frente a Google Fonts (recurso externo, P4) o fuentes del sistema (ya no valen como marca, `design.md` §2.4.3): cuatro woff2 latinos (~89 KB en total) copiados de `@fontsource/ibm-plex-sans-condensed` y `@fontsource/ibm-plex-sans` 5.3.0, sin añadirlos a `tests/package.json`. Verificación (`shared/agent-security.md` §2): ambos paquetes existen desde 2020, la versión 5.3.0 se publicó el 2026-07-19, licencia OFL-1.1, sin scripts de instalación; huellas sha256 de cada archivo en el ADR. **→ ADR 0007**.
- **Marcar la sección actual en el menú** (`system.md` → Navegación): fuera de esta spec; solo "Inicio" se ve resaltado en el tablero del sistema. Va al roadmap (A28, decisión del usuario, 2026-10-09).
- **E15 mide columnas de la rejilla** y no tarjetas de la primera fila: la primera tarjeta de Nosotros ocupa toda la fila a 768 px por diseño (A17, decisión del usuario, 2026-10-09).
- **Cortes con `@media` en la página** (el canvas y `system.html` usan `@container` porque el marco no es la ventana): mismos anchos (600, 768, 1024 px).
- **gitleaks** como escáner de secretos del flujo (fuera de `tests/`). **→ ADR 0006** (A9).
- **Servidor de pruebas en Node** (`tests/servidor.mjs`, ~30 líneas) frente a `python -m http.server`: funciona igual en Windows y Linux sin depender de Python.

## Impacto en arquitectura
- `docs/architecture.md` → Módulos: añadir `act2/index.html`, `act2/css/estilos.css`, `act2/js/app.js`, `act2/img/`, `act2/fonts/` y `tests/`; Integraciones externas: Font Awesome (cdnjs, SRI); Frontend: tokens de `docs/design/system.md` copiados en `act2/css/estilos.css` y fuentes IBM Plex autoalojadas (ADR 0007).
- `docs/deployment.md` → Verificación post-deploy: comando único de smoke `BASE_URL=<url> npm run smoke --prefix tests` (A6). Los estados de RS1.a, RS2.a, OB1.a y RD1.a pasan a mitigada al liberar (`/release`).

## Riesgos y mitigaciones
- Las fuentes tardan en llegar con conexión irregular → `font-display: swap`, precarga de las dos del primer pintado y ~89 KB en total; el texto se lee con `sans-serif` mientras tanto.
- Copia de tokens desincronizada de `system.md` → U7; un valor nuevo se añade primero a `system.md` (P12).
- `<dialog>` en navegadores antiguos (anteriores a 2022) → fuera del objetivo; Chromium, Firefox y Safari actuales lo soportan.
- Imágenes de producto pequeñas (≈ 200–290 px de alto) → en la ficha a `--size-foto` (200 px) con `object-fit: contain`; en el hero a `--size-foto-hero` (260 px), menor que su alto natural, para que nunca se amplíen (A26).
- Con el nuevo orden, la segunda fila de fichas queda más abajo y la carga diferida (`loading="lazy"`) puede retrasar las fotos en E1/E8 (A27: nota de T027).
- El CDN no responde → los iconos no se ven pero el texto sigue siendo legible (los iconos son `aria-hidden` y siempre acompañan a texto).

## Historial
| Fecha | Cambio | Motivo |
|---|---|---|
| 2026-10-08 | `--fix` A5, A6, A10, A11, A13, A14 | /analyze ronda 1 |
| 2026-10-09 | `--fix` A17, A18, A19, A20, A21, A22, A25, A26, A28, A29, A30, A34, A35, A36 | /analyze ronda 3 |
| 2026-10-09 | `--fix` sistema de diseño | Sistema aprobado (`docs/design/system.md`, opción A + IBM Plex) y constitución 1.1.0 (P12): Contratos y datos, tokens, tipografía, ADR 0007, U6, U7, E19, E20 y verificación manual contra `system.html` |
