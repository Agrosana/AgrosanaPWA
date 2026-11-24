---
spec: 003-act2-one-page
plan: plan.md
impl_base: 95afe92
status: approved   # re-aprobado por el usuario el 2026-10-09 tras --fix (/analyze ronda 3)
---

# Tareas · 003 Actividad 2: aplicación web One Page de AgroSana

Formato:
`- [ ] T### [P] <verbo + qué> — <archivos> — hecho cuando: <criterio> — cubre: CA# — depende: T###`
- T001–T089: trabajo. T090–T099: reservadas.
- `[P]` = paralelizable con las demás `[P]` de su grupo una vez cumplidas sus dependencias (no
  comparte archivos con otra tarea abierta).
- Lo generado por un comando cuenta como un archivo.
- `[-]` = obsoleta (`— obsoleta: <motivo> (AAAA-MM-DD)`): no cuenta como abierta ni como hecha.
- Bajo una tarea: `  - nota: …`, `  - bloqueo: AAAA-MM-DD — <qué falta> — <skill a ejecutar>`.
- Política de commits: uno por tarea, `<tipo>(003): T0xx <qué>`, cuerpo con `Cubre: CA…` y la ruta de este archivo, sin `Co-Authored-By` (decisión del usuario, 2026-10-08).

Línea base de tests: no había suite antes de esta spec (sin fallos previos).

## Constitution Check
Revisión del desglose contra [plan.md](plan.md) → Constitution Check:

| Principio | Resultado | Cómo lo respeta el desglose |
|---|---|---|
| P1 Spec aprobada | ✅ | Todas las tareas derivan de la spec 003 `approved` y del plan `approved` (re-aprobados el 2026-10-09) |
| P2 Test antes del código | ✅ | T010–T019, T028 y T029 (tests) preceden a T020–T027; cada implementación `depende:` de su test |
| P3 Estructura de actividad | ✅ | T003, T004 y T020–T027 solo crean archivos en `act2/{index.html,css,js,img,fonts}`; U1/U5 en T010 y T018 |
| P4 Dependencias registradas | ✅ | T001 instala solo las de ADR 0005; T021/T027 añaden solo el recurso de ADR 0004; T004 copia las fuentes de ADR 0007 sin añadir paquetes; U2 en T010, E19 en T019 |
| P5 Solo Font Awesome | ✅ | U3 en T010 y E14 en T013 antes de T021 |
| P6 Responsivo | ✅ | E15 (T015) y E4 (T012) antes de T022/T023; verificación manual en T022 |
| P7 Accesibilidad | ✅ | E18 (T017), E10 (T014), E4 (T012) antes de la implementación |
| P8 Sin PWA | ✅ | Ninguna tarea crea manifest ni Service Worker; U1 lo comprueba |
| P9 Sin secretos ni sinks | ✅ | U4 en T010; gitleaks en cada tarea de implementación |
| P10 Consola limpia | ✅ | E1 en T011 |
| P11 Producción con aprobación | ✅ | T096 exige aprobación registrada antes de T097 |
| P12 Solo el sistema de diseño | ✅ | T005 incorpora al sistema los valores que faltaban (A18); U6 y U7 (T018) antes de T022; verificación manual contra `system.html` en T022 y T027 |

## Preparación
- [x] T001 Crear el entorno de pruebas (scripts `test`, `lint`, `test:e2e`; configuración con proyectos 360/768/1440 y `webServer`; servidor estático en el puerto 4173) — `tests/package.json` (+ `tests/package-lock.json` generado por npm install), `tests/playwright.config.mjs`, `tests/servidor.mjs` — hecho cuando: `package.json` declara versiones exactas (`@playwright/test` 1.56.0, `@fortawesome/fontawesome-free` 6.7.2) y script `smoke`; `npm install --prefix tests --ignore-scripts` genera `tests/package-lock.json` (versionado); `npm audit --audit-level=high --prefix tests` sin hallazgos; `npx --prefix tests playwright test --list` corre sin errores; con `BASE_URL` definida la configuración no levanta `webServer` (A6, A8)
  - nota: corregido durante T021: el script `lint`/`test` usaba `node --test unit/` (Node 22 no acepta una carpeta); ahora `node --test unit/estructura.test.mjs`. La fase roja de T010 se comprobó ejecutando el archivo directamente
  - nota: playwright.config usa url de salud /__salud (añadida a servidor.mjs) porque /act2/ aún no existe y webServer esperaría un 404
- [x] T002 Crear el apoyo que intercepta cdnjs y sirve Font Awesome desde el paquete npm (con opción de alterar el CSS) — `tests/apoyo/cdn.mjs` — hecho cuando: lo importa un test vacío sin errores y, con `BASE_URL` definida, no intercepta nada (A6) — depende: T001
  - nota: incluye vigilarConsola (errores de consola, excepciones y respuestas ≥ 400) en el mismo archivo de apoyo; comprobado: sin BASE_URL intercepta (200) y con BASE_URL no (sin red en el sandbox)
- [x] T003 Copiar las fotos de producto con nombres descriptivos (`frutime.jpg`, `bio-ph.jpg`, `hydrospeed-cab-max.jpg`, `surfatek.jpg`, `prozycar.jpg`) — `act2/img/*.jpg (generado por cp desde antiguo/img)` — hecho cuando: existen los cinco archivos, idénticos a sus originales (E8 sigue fallando porque falta la página) — cubre: CA8 — depende: T013
  - nota: copias idénticas verificadas con cmp; E8 sigue fallando por 404 de /act2/
- [x] T005 Incorporar al sistema los valores que pide el plan ("Cambios a incorporar al sistema": colores del pie y del fondo del diálogo, tamaños de iconos, pictograma, franja, aviso, logotipo, filas del menú y fotos, foco, medidas de línea, margen lateral móvil e interlineados), subir `system.md` a 1.1.0 con su fila en "Decisiones", nombrar el documento de la fila `implícita` de valores tipográficos y corregir su errata (A23), y regenerar `system.html` usando esos tokens — `docs/design/system.md`, `docs/design/system.html` — hecho cuando: cada token de la tabla del plan está en `system.md` con su valor y uso; `system.html` no tiene ningún par "no cumple" y sus fuentes constan como cargadas; `python .ai/bin/aidd.py validate` sin errores — cubre: RNF solo sistema de diseño
  - nota: A35 — revisado con `design:design-handoff`: nueva sección "Handoff para `act2/`" en `system.md` (breakpoints, estados de hover/foco/activo, `scroll-padding-top` bajo el encabezado fijo, nombres largos, conexión lenta, orden de foco) (2026-10-09)
  - nota: A40 — Espaciado, bordes, foco y Tamaños van en tablas `Token | Valor | Uso` para que U7 los lea todos
  - nota: A41 — añadido `--border-hair: 1px`; U6 no tendrá la excepción `1px` (T018)
  - nota: A42 — añadido `--hover-brightness: 0.94`; el hover del botón lo usa
  - nota: A43 — `--space-gutter-m` es el valor; por debajo de 768 px `--space-gutter: var(--space-gutter-m)` (escrito en la tabla de Espaciado)
  - nota: `system.md` 1.1.0 con 22 tokens nuevos y la fila `implícita` con su documento (A23); `system.html` regenerado: 17 pares de contraste, ninguno "no cumple", IBM Plex cargada, mismos altos de página; sin commit porque `docs/` no se versiona
- [x] T004 Copiar las fuentes IBM Plex (`ibm-plex-sans-condensed-latin-700-normal.woff2`, `ibm-plex-sans-latin-{400,600,700}-normal.woff2`) y `OFL.txt` desde `npm pack @fontsource/ibm-plex-sans@5.3.0` y `@fontsource/ibm-plex-sans-condensed@5.3.0` en una carpeta temporal, sin añadirlas a `tests/package.json` — `act2/fonts/* (generado por cp desde npm pack)` — hecho cuando: las huellas sha256 coinciden con la tabla de ADR 0007 y la parte de U1 sobre fuentes (existencia y huellas) pasa — cubre: RNF tipografía autoalojada — depende: T018
  - nota: A46 — archivos marcados como generados por cp desde `npm pack` (como T003)
  - nota: las cuatro huellas sha256 coinciden con ADR 0007; las comprobaciones de fuentes de U1 (existencia, huellas, `OFL.txt`) pasan; U1 sigue fallando solo por `img/campo.svg`, que retira T027. `OFL.txt` une los avisos de copyright de los dos paquetes (difieren solo en esa línea) con el texto de la licencia

## Tests (antes de implementar)
- [x] T010 Escribir las reglas estáticas U1–U5 (estructura y sin PWA ni `package.json` en la raíz; recursos externos aprobados con `integrity`; sin emojis y con iconos `fa-`; sin sinks, `console.*` ni formularios; rutas relativas) — `tests/unit/estructura.test.mjs` — hecho cuando: falla porque `act2/index.html` no existe — cubre: CA1, CA12, CA14, CA16, CA17, CA18 — depende: T001
  - nota: falló antes por la razón esperada: falta act2/index.html (U1) y ENOENT en U2–U5 (2026-10-08)
- [x] T011 [P] Escribir E1 (`@smoke`: `/act2/` 200, sin errores de consola ni respuestas ≥ 400), E2 (encabezado visible tras desplazarse), E3 (anclas del menú), E5 (hero), E6 (secciones) y E13 (pie) — `tests/e2e/basico.spec.mjs` — hecho cuando: falla por 404 de `/act2/` — cubre: CA1, CA2, CA3, CA5, CA6, CA13, CA18 — depende: T002
  - nota: falló antes: HTTP 404 de /act2/ (2026-10-08)
  - nota: corregido durante T021: E5 usaba `/\S{10,}/` (exigía 10 caracteres sin espacios); ahora `/\S.{9,}/`, mismo propósito (texto de 10 o más caracteres), sin debilitar la aserción
  - nota: A16 — E2 se ejecuta en los tres proyectos (360, 768 y 1440 px): no lleva soloEscritorio()
- [x] T012 [P] Escribir E4 (en 360 y 768 px el menú se abre y cierra con el botón, `aria-expanded` cambia, se cierra al elegir un enlace y con `Esc`; en 1440 px el menú está visible y el botón oculto; falla ante `console.error`/`pageerror`) — `tests/e2e/menu.spec.mjs` — hecho cuando: falla por 404 de `/act2/` — cubre: CA4 — depende: T002
  - nota: falló antes: 404 de /act2/; en 360 y 768 el botón Menú no existe (2026-10-08)
- [x] T013 [P] Escribir E7 (tres tarjetas en Nosotros), E8 (cinco productos completos), E12 (`tel:`, `mailto:` con asunto, nota "Datos de contacto de ejemplo para la práctica.", sin `<form>` ni campos) y E14 (iconos renderizados con la fuente de Font Awesome) — `tests/e2e/contenido.spec.mjs` — hecho cuando: falla por 404 de `/act2/` — cubre: CA7, CA8, CA12, CA14 — depende: T002
  - nota: falló antes: 404 de /act2/ (2026-10-08)
- [x] T014 [P] Escribir E9 (filtro: visibles, `aria-pressed`, anuncio "Mostrando N productos", "Todos"; un botón con categoría desconocida deja activo "Todos"), E10 (modal: datos del producto, cierre con botón, fondo y `Esc`, foco de vuelta) y E11 (Ver más / Ver menos con `aria-expanded`); los tres fallan ante `console.error`/`pageerror` — `tests/e2e/interaccion.spec.mjs` — hecho cuando: falla por 404 de `/act2/` — cubre: CA9, CA10, CA11 — depende: T002
  - nota: falló antes: 404 de /act2/ (2026-10-08)
- [x] T015 [P] Escribir E15 (en 360, 768 y 1440 px: `scrollWidth` ≤ ancho; tarjetas de `#nosotros` y `#productos` en 1, 2 y 3 columnas; encabezado visible tras desplazarse) — `tests/e2e/responsivo.spec.mjs` — hecho cuando: falla por 404 de `/act2/` — cubre: CA15 — depende: T002
  - nota: falló antes: 404 de /act2/; el caso de desbordamiento pasaba vacío con la página 404 y se le añadió la espera de las tarjetas para que falle por la razón esperada (2026-10-08)
- [x] T016 [P] Escribir E16 (URL con `#<img src=x onerror=…>` y `?q=<script>` → sin nodos nuevos ni diálogos) y E17 (CSS de Font Awesome alterado → rechazado por integridad) — `tests/e2e/seguridad.spec.mjs` — hecho cuando: falla por 404 de `/act2/` — cubre: CA16, CA17 — depende: T002
  - nota: falló antes: 404 de /act2/ (2026-10-08)
  - nota: corregido en /implement (2026-10-09): E16 pasa por `about:blank` antes de cada URL porque `act2/` → `act2/#…` no recarga el documento; comprobado rompiendo `app.js` (innerHTML desde `location.hash`) y viendo fallar E16
- [x] T017 [P] Escribir E18 (toda `img` con `alt` no vacío salvo decorativas; contraste ≥ 4.5:1 en texto visible; foco visible con teclado; objetivos ≥ 44×44 px en la lista del plan → Estrategia de pruebas, A11) — `tests/e2e/accesibilidad.spec.mjs` — hecho cuando: falla por 404 de `/act2/` — depende: T002
  - nota: falló antes: 404 de /act2/; alt, contraste y foco pasaban vacíos con la página 404 y se les añadió un mínimo de contenido revisado (7 imágenes, 40 textos, 20 paradas de Tab) (2026-10-08)

- [x] T018 [P] Ampliar las reglas estáticas según el plan → Estrategia de pruebas: U1 exige las cuatro fuentes de `act2/fonts/` con las sha256 de ADR 0007 (A36) y que `img/campo.svg` no exista; U6 solo tokens con las reglas exactas del plan (bloques `:root` también dentro de `@media`; exclusiones de `@font-face`, condiciones de `@media`, selectores de `@keyframes` y comentarios; colores, longitudes salvo `0`/`1px`, duraciones salvo `0s`, `font-family`, `font-size`, `font-weight`, `line-height` y `letter-spacing` literales; sin `style=` en `index.html`; un control positivo por clase de literal) (A19); U7 compara `:root` con `tests/unit/tokens-sistema.json`, copia de todas las tablas de tokens de `system.md` 1.1.0, y esa copia con `system.md` cuando `docs/` existe (A25) — `tests/unit/estructura.test.mjs`, `tests/unit/tokens-sistema.json` — hecho cuando: U1 falla (faltan las fuentes y existe `campo.svg`), U6 falla con los literales del CSS actual, U7 falla porque `:root` no tiene los tokens del sistema y la comprobación copia = `system.md` pasa; los controles positivos pasan — cubre: RNF solo sistema de diseño, RNF tipografía autoalojada — depende: T001, T005, T010
  - nota: falló antes (2026-10-09): U1 por las fuentes que faltan; U6 porque `estilos.css` (stub) no tiene declaraciones; U7 porque `:root` no tiene los tokens. La comprobación copia = `system.md` pasa; comprobada rompiendo (`--size-foto` 220px en la copia → falla)
  - nota: A39 — U6 se prueba contra CSS de ejemplo (un control positivo por clase y un caso permitido sin falsos positivos) y contra el `estilos.css` del repositorio; con el `estilos.css` anterior (sin confirmar, tokens verdes) detecta 95 literales
  - nota: A40 — U7 lee todas las tablas de `system.md` 1.1.0 (Color, Tipografía, Espaciado, Tamaños, Movimiento): la copia `tokens-sistema.json` tiene 79 tokens
  - nota: A41 — sin excepción `1px`: solo `0` queda exento (control positivo "longitud 1px")
  - nota: A42 — U6 cubre `font:` y `font-stretch` (controles positivos)
  - nota: U6 exige ≥ 100 declaraciones fuera de `:root` para no pasar en vacío; `tokens-sistema.json` (79 tokens) se generó con el mismo analizador de `system.md` que usa U7
- [x] T019 [P] Escribir E19 (`document.fonts` con IBM Plex Sans e IBM Plex Sans Condensed `loaded`; IBM Plex pedida a `/act2/fonts/`; toda petición de fuente de `/act2/fonts/` o del prefijo de Font Awesome de ADR 0004, A20) y E20 (con `reducedMotion: 'reduce'` la franja de categorías está completa al cargar; sin ella, completa tras `--duration-base`) — `tests/e2e/sistema.spec.mjs` — hecho cuando: falla porque la página no carga IBM Plex ni tiene la franja — cubre: RNF tipografía autoalojada, RNF momento firma — depende: T002
  - nota: falló antes (2026-10-09): E19 porque no hay IBM Plex cargada; E20 (dos casos) porque `#inicio` no tiene `nav.franja`. Pendiente para T022: comprobar rompiendo que E19 detecta una fuente pedida fuera de `act2/fonts/` y que E20 falla sin la regla de movimiento reducido
  - nota: A44 — el único origen externo aceptado para fuentes es el prefijo literal `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/` (constante `PREFIJO_FA`)
- [x] T028 [P] Ajustar los tests de contenido al sistema: E6 comprueba el orden de las secciones y del menú (Inicio, Uso seguro, Productos, Nosotros, Contacto); E5 comprueba la `nav.franja` con 4 enlaces a `#productos` y la `dl` Casa/Atención/Entrega; E13 comprueba la advertencia antes del pie; E8 comprueba la cabecera de cada ficha con su `.categoria` (A22) — `tests/e2e/basico.spec.mjs`, `tests/e2e/contenido.spec.mjs` — hecho cuando: E5, E6, E8 y E13 fallan con la maqueta de T021 (orden y piezas nuevas) — cubre: CA5, CA6, CA8, CA13 — depende: T002
  - nota: falló antes (2026-10-09) con la maqueta de T021: E5 (no hay `dl` Casa/Atención/Entrega ni `nav.franja`), E6 (orden de secciones y menú), E8 (no hay `.producto-cabecera`) y E13 (no hay `.advertencia` abriendo el pie)
  - nota: CA13 exige el aviso **en el pie**: la barra de advertencia del sistema va como primer hijo de `footer.pie` (mismo aspecto: barra amarilla sobre el pie oscuro); E13 lo comprueba así y T027 la coloca ahí
- [x] T029 [P] Ajustar los tests de rejilla y toque al sistema: E15 mide las columnas de la rejilla (`gridTemplateColumns`) de `#productos` y `#nosotros` (1/2/3 a 360/768/1440 px) en lugar de las tarjetas de la primera fila (A17); E18 añade `footer.pie a` y `nav.franja a` a los objetivos ≥ 44 px (A29) — `tests/e2e/responsivo.spec.mjs`, `tests/e2e/accesibilidad.spec.mjs` — hecho cuando: E15 falla porque la rejilla aún no tiene estilos (y con una rejilla de una sola columna) y E18 falla en los enlaces del pie — cubre: CA15, RNF accesibilidad — depende: T002
  - nota: falló antes (2026-10-09) en 360, 768 y 1440 px: E15 porque el contenedor de las tarjetas no es una rejilla (el CSS es el stub; con una rejilla de una columna daría 1 y también fallaría a 768 y 1440: control negativo de A39); E18 porque faltan la franja y los enlaces del pie (comprobación de presencia añadida para que no pase en vacío)
  - nota: A39 — E15 ya no depende del `estilos.css` sin confirmar (se reemplaza en T022): mide `gridTemplateColumns` del contenedor real

## Implementación
- [x] T020 Dibujar el logotipo y la ilustración del hero (surcos y sol) como SVG originales — `act2/img/logo.svg`, `act2/img/campo.svg` — hecho cuando: ambos abren en el navegador y pesan < 10 KB · `gitleaks detect --no-banner --redact` sin hallazgos — cubre: CA2, CA5 — depende: T011
  - nota: logo.svg 523 B y campo.svg 3.6 KB; revisados en captura; gitleaks sin hallazgos
  - nota: A31 — su aporte a CA5 (`campo.svg`) desaparece; CA5 lo cubre ahora T027 (foto de HydroSpeed en el panel de etiqueta) (2026-10-09)
- [x] T021 Escribir la página: encabezado con logotipo, menú y botón de menú; hero; Nosotros con 3 tarjetas; Productos con filtros, región `aria-live` y 5 tarjetas; Uso seguro con 4 + 3 recomendaciones ocultas; Contacto con `tel:`/`mailto:`; pie; `<dialog>`; `<link>` de Font Awesome con `integrity` (control TM1) y contacto sin formulario (control TM3) — `act2/index.html` — hecho cuando: pasan U1–U5, E1, E3 (en 1440), E5, E6, E7, E8, E12, E13, E14 y E17 · `gitleaks detect --no-banner --redact` sin hallazgos — cubre: CA1, CA3, CA5, CA6, CA7, CA8, CA12, CA13, CA14, CA17, CA18 — depende: T003, T010, T011, T013, T016, T020
  - nota: crea act2/css/estilos.css y act2/js/app.js vacíos como stub para que U1 pase; se completan en T022 y T023
  - nota: control TM1 comprobado rompiendo: cambiar la huella o quitar crossorigin hace fallar U2; añadir un <form> con action externo hace fallar U4 (control TM3)
  - nota: pasan U1–U5 y E1, E3, E5, E6, E7, E8, E12, E13, E14, E17 en 1440 px, dos veces seguidas; gitleaks sin hallazgos
- [x] T027 Adaptar la página al sistema de diseño: orden Inicio, Uso seguro, Productos, Nosotros, Contacto (menú y secciones); `#inicio` como panel de etiqueta (foto de HydroSpeed CaB-Max con su `alt`, `dl` Casa/Atención/Entrega, franja de 4 enlaces de categoría); Uso seguro como bloque de precauciones con pictogramas Font Awesome y botón "Ver más precauciones"; fichas con cabecera de categoría; tarjetas de Nosotros desiguales; contacto "Distribuye: AgroSana"; advertencia antes del pie; eliminar `img/campo.svg` (de T020); la precarga de fuentes va en T022 junto al `@font-face` (A21) — `act2/index.html`, `act2/img/campo.svg` (eliminado) — hecho cuando: pasan U1–U5, E1, E3 (en 1440), E5, E6, E7, E8, E12, E13, E14 y E17 · `gitleaks detect --no-banner --redact` sin hallazgos · verificación manual: estructura de cada zona contra `docs/design/system.html` — cubre: CA1, CA3, CA5, CA6, CA7, CA8, CA12, CA13, CA14, CA17, CA18 — depende: T004, T018, T019, T021, T028
  - nota: A27 — verificar en 1440 px que E1 y E8 pasan con el nuevo orden; si la carga diferida los rompe, quitar `loading="lazy"` de las fotos bajo el pliegue o desplazar antes de comprobar (2026-10-09)
  - nota: pasan U1–U5, E1, E3, E5, E6, E7, E8, E12, E13, E14 y E17 en 1440 px, dos veces seguidas; gitleaks sin hallazgos; `img/campo.svg` eliminado
  - nota: A27 aplicada — sin `loading="lazy"` en las fotos (cinco imágenes de ≈ 5–10 KB): E1 y E8 pasan en 1440 px con el nuevo orden
  - nota: la advertencia va como primer hijo de `footer.pie` (CA13 exige el aviso en el pie; mismo aspecto que en el canvas)
  - nota: verificación manual OK 2026-10-09 (usuario): estructura de cada zona contra `system.html`
- [x] T022 Escribir los estilos con el sistema de diseño: `@font-face` de IBM Plex (`font-display: swap`) y su precarga en `index.html` (`<link rel="preload" … as="font" type="font/woff2" crossorigin>` de la 400 y la condensada 700, A21), tokens de `docs/design/system.md` en `:root` (incluidos los de móvil), encabezado fijo, panel de etiqueta y franja con su momento firma, bloque de precauciones, filtro, fichas con cabecera de categoría, tarjetas de Nosotros, contacto, advertencia, pie, rejillas 1/2/3 y menú desplegable por debajo de 1024 px, `<dialog>`, `:focus-visible`, `prefers-reduced-motion`; solo `var(--…)` fuera de `:root` — `act2/css/estilos.css`, `act2/index.html` (solo las dos líneas de precarga) — hecho cuando: E1 (sin avisos de precarga), E2, E15, E18, E19, E20, U6 y U7 pasan · `gitleaks detect --no-banner --redact` sin hallazgos · verificación manual: capturas en 360, 768 y 1440 px contra `docs/design/system.html` (`#inicio-m`, `#inicio-t`, `#inicio-d` y `#estados`), confirmadas por el usuario — cubre: CA2, CA5, CA7, CA15, RNF solo sistema de diseño, RNF momento firma — depende: T004, T005, T015, T017, T018, T019, T027, T029
  - nota: el `estilos.css` sin confirmar de la versión anterior del plan (tokens verdes propios) se reemplaza entero
  - nota: pasan U6, U7, E1, E2, E15, E19, E20 y E18 (alt, contraste y foco) en 360/768/1440 px, dos veces seguidas; E19 comprobado rompiendo (una fuente pedida a otro dominio → falla) y E20 también (sin la versión de movimiento reducido → falla)
  - nota: E18 (objetivos de toque) pasa su lista de objetivos en 1440 px, pero el caso completo necesita el menú (T023) y el diálogo (T025), que son JavaScript; se comprueba completo en T026 (suite completa dos veces)
  - nota: corregidos dos defectos de test sin debilitarlos: U7 buscaba el primer `:root` sin quitar comentarios (encontraba uno equivocado) y E20 solo aceptaba `inset(0px)` cuando el navegador da `inset(0px 0% 0px 0px)`; ahora exige que todos los valores sean 0
  - nota: precarga de las dos fuentes con `as="font" type="font/woff2" crossorigin` (A21): E1 sin avisos de consola
  - nota: verificación manual OK 2026-10-09 (usuario): capturas a 360, 768 y 1440 px contra `system.html`
- [x] T023 Programar el menú móvil (alternar `hidden`/clase, `aria-expanded`, icono, cierre al elegir enlace y con `Esc`), sin leer `location` (control TM2) — `act2/js/app.js` — hecho cuando: E4 y U4 pasan · `gitleaks detect --no-banner --redact` sin hallazgos — cubre: CA4, CA16 — depende: T012, T022
  - nota: falló antes: E4 con el `app.js` vacío (el botón de menú no aparece sin la clase `js`); pasa en 360, 768 y 1440 px dos veces; U4 pasa (sin leer `location`, control TM2). Con JS, la lista de objetivos ≥ 44 px de E18 ya pasa también en 360 y 768 px (el caso completo espera al diálogo de T025)
  - nota: progresivo: sin JavaScript el menú queda visible como lista; el script añade la clase `js` y lo vuelve desplegable
- [x] T024 Programar el filtro por categoría (solo categorías conocidas; `aria-pressed`; anuncio con `textContent`) — `act2/js/app.js` — hecho cuando: E9 y U4 pasan · `gitleaks detect --no-banner --redact` sin hallazgos — cubre: CA9, CA16 — depende: T014, T023
  - nota: falló antes (sin filtro, E9 no cambiaba los visibles); pasa dos veces en 1440 px; U4 pasa. Control de categorías conocidas comprobado rompiendo (aceptar cualquier `data-categoria` → falla el caso "categoría desconocida")
- [x] T025 Programar la ventana modal con `<dialog>` (rellena con `textContent` y atributos desde el `article`; cierre con botón, fondo y `Esc`; foco de vuelta) — `act2/js/app.js` — hecho cuando: E10 y U4 pasan · `gitleaks detect --no-banner --redact` sin hallazgos — cubre: CA10, CA16 — depende: T014, T024
  - nota: falló antes (sin script el diálogo no se abre); E10 pasa dos veces en 1440 px y U4 pasa (solo `textContent` y atributos). Con el diálogo, E18 (objetivos de toque, incluido Cerrar) pasa completo en 360, 768 y 1440 px
- [x] T030 Corregir el `afterEach` de E9–E11: inicializar `problemas` antes del `skip` para que en 360 y 768 px (proyectos saltados) no compruebe `undefined` — `tests/e2e/interaccion.spec.mjs` — hecho cuando: `npm test --prefix tests` no tiene fallos en E9–E11 en ningún proyecto y en 1440 px siguen exigiendo cero errores de consola — cubre: CA9, CA10, CA11, CA18 — depende: T014
  - nota: añadida durante /implement: defecto de test de T014 descubierto en T026 con `npm test` (8 fallos «Received: undefined» según el reparto de workers); aprobada por el usuario 2026-10-09
  - nota: falló antes: 8 fallos en movil/tableta con `npm test`; después, 0. No debilita: en 1440 px el `afterEach` sigue exigiendo la lista vacía (comprobado rompiendo: un `console.error` en `app.js` hace fallar E9 en 1440 px)
- [x] T031 Igualar la ventana de detalles al tablero «Estados» de `system.html`: cabecera del color de la categoría con su nombre y el botón Cerrar, foto a la izquierda (apilada por debajo de 600 px), nombre, uso y aviso en negrita; E10 lo comprueba — `act2/index.html`, `act2/css/estilos.css`, `tests/e2e/interaccion.spec.mjs` — hecho cuando: E10 ampliado falla antes y pasa después; suite completa dos veces · verificación manual: diálogo a 360 y 1440 px contra `system.html#estados` — cubre: CA10 — depende: T025
  - nota: añadida durante /implement a petición del usuario (2026-10-09): la ventana de detalles no coincidía con el tablero del sistema
  - nota: falló antes (no había `.modal-cabecera`); E10 pasa y la suite completa (10 + 43) pasa dos veces; U6/U7 siguen en verde (tamaños de la foto con `calc()` sobre `--size-foto`, sin literales)
  - nota: se retira el subtítulo "Para qué sirve" para coincidir con el tablero; el texto de uso y el aviso de la etiqueta se mantienen (E10)
  - nota: verificación manual OK 2026-10-09 (usuario): diálogo a 360 y 1440 px contra `system.html#estados`
- [x] T026 Programar "Ver más precauciones / Ver menos precauciones" (`hidden`, `aria-expanded`, texto del botón) — `act2/js/app.js` — hecho cuando: E11, E16 y la suite completa (`npm test --prefix tests`) pasan dos veces seguidas · `gitleaks detect --no-banner --redact` sin hallazgos — cubre: CA11, CA16, CA18 — depende: T014, T016, T025
  - nota: falló antes (el botón no cambiaba nada); E11 y E16 pasan y la suite completa (`npm test --prefix tests`: 10 reglas estáticas y 43 casos de navegador en 360/768/1440) pasa dos veces seguidas tras T030; gitleaks sin hallazgos

- [x] T032 [P] Hacer que E18 (foco) recorra todos los controles enfocables de la página con el menú abierto en 360/768 px y con el diálogo abierto (Cerrar), y que exija contraste ≥ 3:1 entre el color del anillo (`outline-color`) y el fondo efectivo sobre el que se dibuja — `tests/e2e/accesibilidad.spec.mjs` — hecho cuando: falla hoy en los enlaces del pie y de la franja — cubre: CA4, CA9, CA13, RNF accesibilidad — depende: T002
  - nota: añadida por /review: R4
  - nota: falló antes (2026-10-09) en 360/768/1440 px por los motivos de R1–R3: enlaces del pie 1.00:1, franja 2.66:1 y el filtro junto al segmento activo 1.00:1. Recorre los 31 controles (distingue los enlaces iguales del menú y del pie por su posición en el documento) y el botón Cerrar de la ventana
- [x] T033 [P] E13 comprueba un "© AAAA" de cuatro cifras en el pie en lugar del año actual; E9 comprueba que un enlace de la franja ("Fungicidas") lleva a Productos con ese filtro activo, su `aria-pressed` y el anuncio "Mostrando 1 producto" — `tests/e2e/basico.spec.mjs`, `tests/e2e/interaccion.spec.mjs` — hecho cuando: el caso de la franja de E9 falla hoy y E13 pasa con el año fijo de la entrega — cubre: CA9, CA13 — depende: T002
  - nota: añadida por /review: R5, R7
  - nota: el caso de la franja falló antes ("Fungicidas" no queda con `aria-pressed="true"`); E13 pasa con el año fijo de la entrega y ya no depende de la fecha en que corre
- [x] T034 Subir `system.md` a 1.2.0: `--color-focus-on-dark` (#FFFFFF) para el foco sobre el pie, la franja, el segmento activo del filtro y la cabecera de la ventana; `--focus-offset-inset` (-6px) para el anillo interior; `--size-foto-modal` (120px), `--size-foto-modal-alto` (140px) y `--size-modal` (720px); regenerar `system.html` y su fila en "Decisiones" — `docs/design/system.md`, `docs/design/system.html` — hecho cuando: los tokens nuevos están en sus tablas con contraste declarado; `system.html` sin pares "no cumple"; validador sin errores — cubre: RNF solo sistema de diseño, RNF accesibilidad
  - nota: añadida por /review: R1, R2, R3, R6
  - nota: `system.md` 1.2.0 con los cinco tokens y su fila en "Decisiones"; `system.html` regenerado: 19 pares, ninguno "no cumple" (foco sobre el pie 18.31:1; sobre la franja, peor caso 5.68:1); sin commit porque `docs/` no se versiona
- [x] T035 U6 detecta multiplicadores decimales dentro de `calc()` (con control positivo) y `tokens-sistema.json` se regenera con los tokens de 1.2.0 — `tests/unit/estructura.test.mjs`, `tests/unit/tokens-sistema.json` — hecho cuando: U6 falla hoy por `calc(var(--size-foto) * 0.6)` y U7 por los tokens nuevos que faltan en `:root` — cubre: RNF solo sistema de diseño — depende: T034
  - nota: añadida por /review: R6
  - nota: falló antes: U6 por los tres `calc(var(--size-foto) * 0.6|0.7)` y U7 por los cinco tokens de 1.2.0 que faltan en `:root`; el control positivo "multiplicador en calc" pasa y el caso permitido sigue sin falsos positivos; `tokens-sistema.json` regenerado con el mismo analizador (84 tokens)
- [x] T036 Aplicar las correcciones: anillo de foco visible sobre fondos oscuros (pie, franja, segmento activo y cabecera de la ventana) e interior en la franja y el filtro; tamaños de la ventana con sus tokens; los enlaces de la franja aplican el filtro de su categoría (sin leer la URL) — `act2/css/estilos.css`, `act2/js/app.js` — hecho cuando: E18, E9, E13, U6 y U7 pasan y la suite completa pasa dos veces · `gitleaks detect --no-banner --redact` sin hallazgos · verificación manual: foco con teclado en el pie, la franja y el filtro a 360 y 1440 px — cubre: CA9, CA13, RNF accesibilidad, RNF solo sistema de diseño — depende: T032, T033, T035
  - nota: añadida por /review: R1, R2, R3, R6, R7
  - nota: pasan E18 (foco ≥ 3:1 en los 31 controles y en Cerrar), E9 (franja que filtra), E13, U6 y U7; suite completa (10 + 46) dos veces; gitleaks sin hallazgos
  - nota: verificación manual OK 2026-10-09 (usuario): foco en la franja, el filtro y el pie a 360 y 1440 px
- [x] T037 `vercel.json` en la raíz con `"trailingSlash": true`, para que Vercel redirija `/act2` a `/act2/` y las rutas relativas (`css/`, `js/`, `img/`, `fonts/`) carguen; test U8 — `vercel.json`, `tests/unit/estructura.test.mjs` — hecho cuando: U8 falla hoy por la falta de `vercel.json` y la suite completa pasa · verificación manual: `https://agro-sana.vercel.app/act2` carga con estilos — cubre: CA1, RNF despliegue — depende: T036
  - nota: añadida por /release (T095): en staging `/act2` sin barra final pedía `/css/estilos.css` (404) y la página salía sin estilos (usuario, 2026-10-09)
  - nota: falló antes: U8 por la falta de `vercel.json`; después, suite completa 11 + 46

## Integración y documentación
- [x] T090 Actualizar `docs/architecture.md`: módulos `act2/` (con `fonts/`) y `tests/`, integración Font Awesome (cdnjs, SRI), tokens de `docs/design/system.md` en `act2/css/estilos.css` y fuentes autoalojadas (ADR 0007); `status` sigue `inferred` (A7)
  - nota: Módulos de `act2/` (página, estilos, comportamiento, fuentes, imágenes) y `tests/`; diagrama con fuentes y pruebas; Integraciones (Font Awesome con SRI, IBM Plex propia) y Frontend (sistema de diseño y P12); `status` sigue `inferred` (A7)
- [x] T091 Actualizar `docs/deployment.md` (comando único de smoke `BASE_URL=<url> npm run smoke --prefix tests`, A6) y anotar en `docs/security.md`, `docs/observability.md` y `docs/deployment.md` RS1.a, RS2.a, OB1.a y RD1.a como `en curso (spec 003)` y RS1.b como `pendiente → roadmap objetivo 3`; el paso a `mitigada` lo hace `/release` (A7)
  - nota: `deployment.md` → comando único de smoke; RS1.a, RS2.a, OB1.a y RD1.a `en curso (spec 003)`; RS1.b `pendiente → roadmap objetivo 3`
  - nota: A45 — añadido a `docs/roadmap.md` → Pendientes "Marcar la sección actual en el menú"
- [x] T092 Marcar spec como `implemented`
  - nota: suite completa sin fallos (10 reglas estáticas, 43 casos de navegador en 360/768/1440 px), `npm audit` sin hallazgos altos y gitleaks sin hallazgos sobre `95afe92..HEAD`; CA1–CA18 marcados

## Despliegue (lo ejecuta `/release`)
- [ ] T095 Desplegar a staging y verificar criterios de aceptación
  - Preview de Vercel: `/act2/` responde 200 por HTTPS y `BASE_URL=<preview>/ npm run smoke --prefix tests` pasa (iconos cargados desde cdnjs real)
- [ ] T096 Aprobación humana para producción
- [ ] T097 Desplegar a producción y vigilar métricas del plan (Rollout)
- [ ] T098 Marcar spec como `released`

## Cobertura
| Criterio | Tarea(s) de test | Tarea(s) de implementación |
|---|---|---|
| CA1 | T010, T011 | T021, T027 |
| CA2 | T011 | T020, T022, T027 |
| CA3 | T011 | T021, T027 |
| CA4 | T012 | T023 |
| CA5 | T011, T028 | T021, T027, T022 |
| CA6 | T011, T028 | T021, T027 |
| CA7 | T013 | T021, T027, T022 |
| CA8 | T013, T028 | T003, T021, T027 |
| CA9 | T014, T033 | T024, T036 |
| CA10 | T014 | T025 |
| CA11 | T014 | T026 |
| CA12 | T010, T013 | T021, T027 |
| CA13 | T011, T028, T033 | T021, T027 |
| CA14 | T010, T013 | T021, T027 |
| CA15 | T015, T029 | T022 |
| CA16 | T010, T016 | T023, T024, T025, T026 |
| CA17 | T010, T016 | T021, T027 |
| CA18 | T010, T011, T012, T014 | T021, T027, T026 |

| Amenaza (TM#) | Tarea(s) de control | Tarea(s) de test |
|---|---|---|
| TM1 | T021, T027 | T016, T010 |
| TM2 | T023, T024, T025, T026 | T016, T010 |
| TM3 | T021, T027 | T013, T010 |

| Cambio del plan (módulo) | Tarea(s) |
|---|---|
| `act2/index.html` | T021, T027 |
| `act2/css/estilos.css` | T022 |
| `act2/js/app.js` | T023, T024, T025, T026 |
| `act2/img/` | T003, T020, T027 (elimina `campo.svg`) |
| `act2/fonts/` | T004 |
| `tests/` | T001, T002, T010–T019, T028, T029 |
| `docs/design/system.md`, `system.html` (Cambios a incorporar al sistema) | T005 |
| `.gitignore` | ya configurado en /init (sin cambios) |
| Riesgos RS1/RS2/OB1/RD1 (estado) | T091 |

| Requisito no funcional | Tarea(s) de test o verificación manual (T095) |
|---|---|
| Accesibilidad WCAG 2.1 AA básica | T017, T014, T012, T029, T032 · verificación manual en T036 |
| Utilizable en 360/768/1440 | T015 · verificación manual en T022 |
| Sin errores de consola | T011 |
| Interfaz solo con el sistema de diseño (P12) | T005, T018 · verificación manual en T022 |
| Tipografía autoalojada y cargada | T018, T019 |
| Un solo momento animado con versión sin movimiento | T019 · verificación manual en T022 |

## Historial
| Fecha | Cambio | Motivo |
|---|---|---|
| 2026-10-08 | `--fix` A1, A2, A3, A4, A5, A6, A7, A8, A10, A12, A15 | /analyze ronda 1 |
| 2026-10-09 | `--fix` A17, A18, A19, A20, A21, A22, A23, A25, A29, A30, A33, A35, A36: nuevas T005, T028 y T029; T018, T019, T022 y T027 corregidas; T027 antes de T022; notas A27 (T027) y A31 (T020) | /analyze ronda 3 |
| 2026-10-09 | `--fix` sistema de diseño: nuevas T004, T018, T019, T027; T022, T026 y T090 corregidas; T020 sigue hecha (`campo.svg` se elimina en T027) | `/plan 003 --fix` (sistema aprobado, constitución 1.1.0, ADR 0007) |
