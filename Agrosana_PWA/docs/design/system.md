---
status: approved         # aprobado por el usuario el 2026-10-09
source: chosen
version: 1.2.0
html: docs/design/system.html
canvas: https://claude.ai/artifact/RNYSKiMdXyBGGESJcFrsjX
widths: [360, 768, 1440]
created: 2026-10-09
updated: 2026-10-09
---

# Sistema de diseño de AgroSana

Fuente de verdad visual del proyecto. Toda pantalla nueva o modificada usa estos tokens y
componentes; un valor que no esté aquí se añade primero aquí (sección "Cambios a incorporar" del
plan que lo necesite). Vista: [system.html](system.html).

## Dirección

**Opción A · La etiqueta** de la ronda 3 (spec 003), con la **pareja tipográfica 3** de la ronda de
tipografía (`docs/specs/003-act2-one-page/design/tipografia-a.html`): IBM Plex Sans Condensed +
IBM Plex Sans. No se combinó nada de B ni de C.

En el campo, la etiqueta del envase es el documento de confianza: la página se lee como una
etiqueta, con marco grueso, datos claros, franja de categorías de color y precauciones en amarillo
antes que el catálogo. Quien la usa debe sentir que trata con una casa seria que conoce sus
productos y le dice cómo usarlos con seguridad, y poder leerla a pleno sol con el teléfono en una
mano. Dirección creativa: [creative-direction.md](creative-direction.md).

## Color

| Token | Valor | Uso | Contraste sobre su fondo |
|---|---|---|---|
| `--color-bg` | `#FBFBF7` | Fondo base | — |
| `--color-surface` | `#FFFFFF` | Paneles de etiqueta, fichas, filtros | — |
| `--color-text` | `#111611` | Texto principal, bordes de 3 px, pie | 17.65:1 sobre --color-bg · 18.31:1 sobre --color-surface |
| `--color-text-muted` | `#3E4A41` | Texto secundario (subtítulos, conteo, notas) | 8.95:1 sobre --color-bg |
| `--color-primary` | `#1B6B2A` | Acción principal, titular, marca | 6.36:1 sobre --color-bg |
| `--color-on-primary` | `#FFFFFF` | Texto sobre la acción principal y sobre las franjas | 6.60:1 sobre --color-primary |
| `--color-border` | `#111611` | Bordes y separadores (delimitan controles) | 18.31:1 sobre --color-surface |
| `--color-focus` | `#111611` | Anillo de foco (3 px, separado 3 px) | 17.65:1 sobre --color-bg |
| `--color-danger` | `#A3261A` | Errores | 7.10:1 sobre --color-bg |
| `--color-success` | `#1B6B2A` | Confirmaciones | 6.36:1 sobre --color-bg |
| `--color-warning` | `#6E5600` | Borde de avisos | — |
| `--color-warning-bg` | `#F2C200` | Fondo de aviso y precaución | 10.89:1 (--color-text encima) |
| `--color-accent` | `#F2C200` | Amarillo de precaución: barra de Uso seguro y advertencia final; nunca decorativo | 10.89:1 (--color-text encima) |
| `--color-cat-fertilizantes` | `#2B5D8C` | Franja y cabecera de ficha de Fertilizantes | 6.89:1 (--color-on-primary encima) |
| `--color-cat-fungicidas` | `#9B3B2A` | Ídem, Fungicidas | 6.88:1 |
| `--color-cat-coadyuvantes` | `#2F6F6A` | Ídem, Coadyuvantes | 5.83:1 |
| `--color-cat-bioestimulantes` | `#5B6E1F` | Ídem, Bioestimulantes | 5.68:1 |
| `--color-on-dark` | `#FFFFFF` | Enlaces del pie | 18.31:1 sobre --color-text |
| `--color-text-on-dark` | `#E7ECE6` | Texto del pie | 15.29:1 sobre --color-text |
| `--color-backdrop` | `rgba(17, 22, 17, 0.72)` | Fondo oscurecido tras el diálogo | — |
| `--color-focus-on-dark` | `#FFFFFF` | Anillo de foco sobre fondos oscuros: pie, franja de categorías, segmento activo del filtro y cabecera de la ventana | 18.31:1 sobre --color-text · ≥ 5.68:1 sobre los cuatro --color-cat-* |

Todo color de texto declara su contraste calculado (WCAG: ≥ 4.5:1 texto normal, ≥ 3:1 texto grande
y bordes de control); los valores salen de la sección Color de `system.html`. La categoría siempre
va escrita: el color de la franja nunca es el único indicador. Modo oscuro: no aplica (lectura al
sol, brief).

## Tipografía

| Token | Familia | Pesos | Uso |
|---|---|---|---|
| `--font-display` | IBM Plex Sans Condensed, IBM Plex Sans, sans-serif | 700 | Titulares, marca, franja de categorías, barra de precauciones, advertencia |
| `--font-sans` | IBM Plex Sans, sans-serif | 400, 600, 700 | Texto, botones, filtros, navegación, datos |
| `--font-mono` | ui-monospace, "Cascadia Mono", Menlo, monospace | 400 | No se usa en la página (reservada) |

| Nivel | Móvil (≤ 767 px) | Escritorio | Interlineado |
|---|---|---|---|
| `--text-h1` | 46px (`--text-h1-m`) | 74px | `--leading-display` .98 |
| `--text-h2` | 32px (`--text-h2-m`) | 44px | 1 |
| `--text-h3` | 32px | 32px | 1 |
| `--text-brand` (marca) | 32px | 32px | .9 |
| `--text-label` (franja, barra de precauciones, advertencia) | 20px (`--text-label-m`) | 24px | 1.55 |
| `--text-body` | 17px | 17px | 1.55 |
| `--text-small` | 16px | 16px | 1.55 |

| Token | Valor | Uso |
|---|---|---|
| `--weight-display` | 700 | Títulos (máximo de Plex Condensed) |
| `--weight-label` | 700 | Franja de categorías |
| `--weight-strong` | 700 | Botones, filtros, cabecera de ficha, datos destacados |
| `--weight-medium` | 600 | Navegación |
| `--weight-regular` | 400 | Texto |
| `--stretch-display` | 100% | (Plex Condensed ya es condensada) |
| `--tracking-display` | -.01em | Titulares |
| `--tracking-brand` | 0 | Marca |
| `--leading-display` | .98 | Titular |
| `--leading-body` | 1.55 | Texto, botones, franja y avisos |
| `--leading-tight` | 1 | Títulos de sección y de ficha |
| `--leading-brand` | .9 | Nombre de la marca |

Ningún texto baja de 16 px (brief: lectura al sol). Fuentes **autoalojadas**: archivos woff2
(subconjunto latino) de `@fontsource/ibm-plex-sans-condensed` 700 y `@fontsource/ibm-plex-sans`
400/600/700, versión 5.3.0, servidos desde `act2/` con `font-display: swap`; nunca desde un servicio
externo (constitución P4). Licencia SIL Open Font License 1.1.

## Espaciado, radios, bordes y sombras

| Token | Valor | Uso |
|---|---|---|
| `--space-1` … `--space-8` | 4px, 8px, 12px, 16px, 24px, 32px, 48px, 72px | Escala de espaciado |
| `--space-gutter` | 40px (por debajo de 768 px vale `var(--space-gutter-m)`) | Margen lateral de pantalla |
| `--space-gutter-m` | 16px | Margen lateral por debajo de 768 px |
| `--radius-sm` · `--radius-md` · `--radius-lg` | 0px · 0px · 0px | Esquinas rectas de etiqueta |
| `--border-width` | 3px | Marcos, botones, fichas, filtros |
| `--border-hair` | 1px | Separadores internos (filetes de la navegación, filas de datos, pictogramas) |
| `--shadow-1` | none | Sin sombras |
| `--touch-min` | 48px | Objetivo de toque mínimo (incluidos los enlaces del pie) |
| `--focus-width` · `--focus-offset` | 3px · 3px | Anillo de foco con `--color-focus` |
| `--focus-offset-inset` | -6px | Anillo interior (franja y filtro), dentro del propio control para que no lo tape el vecino ni el marco |
| `--hover-brightness` | 0.94 | Hover de botones (`filter: brightness(var(--hover-brightness))`) |

## Tamaños

| Token | Valor | Uso |
|---|---|---|
| `--size-icon` | 24px | Iconos en línea (contacto, avisos) |
| `--size-icon-lg` | 40px | Icono dentro del pictograma de precaución |
| `--size-picto` | 72px | Caja del pictograma de precaución |
| `--size-franja` | 72px | Alto mínimo de cada enlace de la franja de categorías |
| `--size-aviso` | 64px | Alto mínimo de la advertencia "Lee siempre la etiqueta" |
| `--size-logo` | 48px | Logotipo |
| `--size-menu-row` | 52px | Filas del menú del teléfono |
| `--size-foto` | 200px | Alto de la foto en la ficha (`object-fit: contain`) |
| `--size-foto-hero` | 260px | Alto máximo de la foto del hero (menor que su alto natural: nunca se amplía) |
| `--measure-text` | 54ch | Ancho máximo del párrafo del hero |
| `--measure-note` | 46ch | Ancho máximo del subtítulo de cada sección |
| `--size-foto-modal` | 120px | Ancho de la foto en la ventana de detalles |
| `--size-foto-modal-alto` | 140px | Alto de la foto en la ventana de detalles |
| `--size-modal` | 720px | Ancho máximo de la ventana de detalles |

Las proporciones de rejilla (`fr`), los porcentajes de maquetación y los pasos de `@keyframes` no
son tokens: forman parte de la composición de cada componente.

## Componentes

Vista de todos en `system.html` → Componentes y en el tablero "Estados y momento firma". Iconos:
en el canvas son trazos en línea; en la página, Font Awesome (constitución P5), decorativos con
`aria-hidden="true"`.

### Botón
Primario (`--color-primary`, texto `--color-on-primary`) para "Ver productos" y "Solicitar asesoría";
secundario (superficie, borde de `--border-width` `--color-border`) para "Ver detalles" y "Ver más precauciones".
Estados: reposo, hover (`brightness(var(--hover-brightness))`), foco (anillo `--focus-width` de
`--color-focus` separado `--focus-offset`), activo; deshabilitado no se usa en la página (si hiciera
falta, se añade antes un token al sistema, no solo opacidad). Altura y ancho ≥
`--touch-min`; peso `--weight-strong`; sin flechas ni mayúsculas.

### Navegación y menú del teléfono
Escritorio: enlaces separados por filetes de `--border-hair`, `--weight-medium`. Por debajo de 1024 px: botón
de menú de 48 × 48 con `aria-expanded` y `aria-label`; el menú abierto lista las cinco secciones en
filas de `--size-menu-row` y marca la actual en negro. Orden: Inicio, Uso seguro, Productos, Nosotros, Contacto.

### Panel de etiqueta (hero)
Marco de `--border-width` con dos columnas (texto | imagen + datos de la casa en `dl`), una columna por debajo de
1024 px; debajo, la **franja de categorías**: cuatro enlaces de `--size-franja` de alto con el color de la
categoría y su nombre escrito (2 × 2 por debajo de 1024 px).

### Bloque de precauciones
Marco de `--border-width`, barra `--color-accent` con icono de advertencia y título en `--font-display`, cuatro
pictogramas en caja de `--size-picto` con su texto (4 / 2 / 1 columnas) y pie con "Ver más precauciones"
(`aria-expanded`).

### Filtro
Grupo (`role="group"` con `aria-label`) de botones segmentados dentro de un marco de `--border-width`; el activo
en `--color-text` con texto blanco y `aria-pressed="true"`. Debajo, el conteo vivo ("Mostrando 5
productos"). En 360 px los segmentos ocupan dos por fila.

### Ficha de producto
Marco de `--border-width`; cabecera con el color de su categoría, el nombre de la categoría y, si la etiqueta lo
da, la composición; nombre en `--text-h3`; foto de etiqueta (`--size-foto`, `object-fit: contain`, `alt`
descriptivo); descripción; botón secundario "Ver detalles". Rejilla de 3 / 2 / 1 columnas en 1440 /
768 / 360 px (CA15).

### Tarjetas de Nosotros
Tres tarjetas (CA7) que no son iguales: la primera ocupa doble ancho en `--color-primary` con título
en `--text-h2`; las otras dos en superficie con borde de `--border-width`.

### Aviso, diálogo y mensajes
Ventana de detalles: `<dialog>` modal con cabecera del color de la categoría, botón Cerrar de `--touch-min`,
foco atrapado y retorno del foco al botón que la abrió; fondo `--color-backdrop`. Advertencia
"Lee siempre la etiqueta antes de usar cualquier producto." en barra `--color-accent` antes del pie.

### Estados de pantalla
Vacío del filtro: "Mostrando 0 productos" en amarillo, título "Aún no hay productos en esta
categoría", ayuda "Pregúntanos por teléfono: lo conseguimos sobre pedido." y botón "Ver todos los
productos". Sin carga ni error de datos (contenido estático); si los iconos no cargan, el texto sigue
completo.

## Movimiento

| Token | Valor | Uso |
|---|---|---|
| `--duration-fast` | 150ms | Hover y cambio de filtro |
| `--duration-base` | 600ms | Momento firma |
| `--ease-out` | `cubic-bezier(0.2, 0, 0, 1)` | Entradas |

**Momento firma (único):** al cargar, la franja de categorías se imprime de izquierda a derecha
(`clip-path: inset(0 100% 0 0)` → 50 % → 0) en `--duration-base` con `--ease-out`. Con
`prefers-reduced-motion: reduce` las duraciones valen 0 y la franja aparece completa. Ventana de
detalles y menú aparecen sin animación. Solo `transform`, `opacity` y `clip-path`.

## Pantallas principales

| Pantalla | Móvil | Escritorio | Componentes |
|---|---|---|---|
| Página única de `act2/` (Inicio, Uso seguro, Productos, Nosotros, Contacto) | `system.html#inicio-m` (y `#inicio-t` a 768 px) | `system.html#inicio-d` | Navegación, panel de etiqueta, franja, bloque de precauciones, filtro, fichas, tarjetas de Nosotros, contacto, advertencia, pie |
| Estados | `system.html#estados` | — | Botones, vacío del filtro, menú abierto, ventana de detalles, momento firma |

## Handoff para `act2/` (spec 003)

Revisión con `design:design-handoff` (2026-10-09). Cubre lo que el resto del sistema no fija;
todo con tokens.

| Breakpoint (ventana) | Cambios |
|---|---|
| ≥ 1024 px | Navegación visible; panel de etiqueta en dos columnas (1.6fr 1fr); franja 4 × 1; pictogramas 4; fichas 3; Nosotros 2fr 1fr 1fr |
| 768–1023 px | Botón de menú; panel en una columna; franja 2 × 2; pictogramas 2; fichas 2; Nosotros 2 columnas con la primera tarjeta a todo el ancho |
| 600–767 px | Además: `--space-gutter` = `--space-gutter-m`; títulos `-m`; cabeceras de sección apiladas; contacto en una columna |
| < 600 px | Fichas, Nosotros y pictogramas en 1 columna; filtros dos por fila; franja con `--text-label-m` |

| Elemento | Estado | Comportamiento |
|---|---|---|
| Botones, enlaces de la franja | Hover | `filter: brightness(var(--hover-brightness))` |
| Enlaces de texto y del menú | Hover | `--color-primary` |
| Todo control | Foco con teclado | Anillo `--focus-width` de `--color-focus`, separado `--focus-offset` (`:focus-visible`) |
| Filtro | Activo | `aria-pressed="true"`, fondo `--color-text`, texto `--color-on-primary` |
| Botón de menú | Abierto | `aria-expanded="true"`, icono `fa-xmark`, `aria-label` "Cerrar menú" |
| Diálogo | Abierto | `max-height: calc(100% - var(--space-6))` con desplazamiento interno en 360 px |

Casos límite:
- **Anclas bajo el encabezado fijo:** `html { scroll-padding-top: calc(var(--size-logo) + var(--space-6)); }`
  para que el título de la sección no quede debajo del encabezado.
- **Nombres largos** ("HydroSpeed CaB-Max"): pueden partir línea; `overflow-wrap: anywhere` en el
  título de la ficha para que nunca desborde a 360 px.
- **Conexión lenta:** fuentes con `font-display: swap` (se lee primero con `sans-serif`); fotos con
  `width`/`height` para que no salte la maquetación.
- **Sin JavaScript:** el contenido se ve completo (está en el HTML); solo se pierden el menú
  desplegable, el filtro, la ventana de detalles y "Ver más precauciones".
- **Sin iconos (CDN caído):** los iconos son `aria-hidden` y siempre acompañan a texto.

Accesibilidad: orden de foco = orden del documento (marca, menú, "Ver productos", franja,
"Ver más precauciones", filtros, "Ver detalles" ×5, contacto, pie); región `aria-live="polite"`
para "Mostrando N productos", siempre montada; el diálogo devuelve el foco al botón que lo abrió.

## Reglas de uso

- Una acción principal por pantalla ("Ver productos"); el verde de marca es la acción, el amarillo
  solo precaución, los cuatro colores de categoría solo categorías y siempre con su nombre escrito.
- Esquinas rectas y bordes de 3 px en todo lo que se toca; nada de sombras ni degradados.
- Ningún valor literal de color, tamaño o espaciado fuera de los tokens (principio "solo tokens"
  de la constitución, verificado por test o lint).
- Un solo momento animado (la franja); el resto, sobrio.

## Decisiones

| Fecha | Tipo | Pregunta / conflicto | Decisión | Fuente |
|---|---|---|---|---|
| 2026-10-09 | diseño | Opción de la ronda 3 | A · La etiqueta, sin combinar | usuario |
| 2026-10-09 | diseño | Tipografía de A | Pareja 3: IBM Plex Sans Condensed (títulos) + IBM Plex Sans (texto), tras una ronda solo de tipografía (`tipografia-a.html`) | usuario |
| 2026-10-09 | implícita | Tamaños de título con Plex | 74/46 px (h1), 44/32 (h2), 32 (h3), 24/20 (franja): el titular conserva 3 líneas a 360 px y 2 a 1440 px como en A | `tipografia-a.html` |
| 2026-10-09 | implícita | Valores tipográficos fijos de la opción | Pasan a tokens (`--text-h3`, `--text-label`, `--text-brand`, pesos, interlineado, tracking); el título de las tarjetas de Nosotros pasa de 30 a 32 px | plugin ai-dd 1.11.4, `skills/init/references/design.md` §2.5 y constitución P12 ("solo tokens") |
| 2026-10-09 | implícita | Tamaño mínimo de texto | 16 px (`--text-small`), subido de 15 en la ronda 3 | brief.md (texto ≥ 16 px) |
| 2026-10-09 | implícita | Origen de las fuentes | Autoalojadas en `act2/` desde `@fontsource` 5.3.0; sin CDN | constitución P4 |
| 2026-10-09 | contradicción | CA7 (3 tarjetas) frente a la tríada prohibida | Se mantiene CA7 con tarjetas desiguales | usuario (brief.md) |
| 2026-10-09 | diseño | Aprobación del sistema | Aprobado (draft → approved) | usuario |
| 2026-10-09 | implícita | Valores que la página necesita y 1.0.0 no nombraba | Versión 1.1.0: colores del pie y del fondo del diálogo, `--border-hair`, foco, `--hover-brightness`, `--space-gutter-m`, tamaños, medidas e interlineados con nombre; espaciado y tamaños en tablas | `docs/specs/003-act2-one-page/plan.md` → Cambios a incorporar al sistema; /analyze A18, A23, A40–A43 |
| 2026-10-09 | diseño | Foco invisible sobre fondos oscuros y tamaños de la ventana sin token (/review R1–R3, R6) | Versión 1.2.0: `--color-focus-on-dark`, `--focus-offset-inset`, `--size-foto-modal`, `--size-foto-modal-alto`, `--size-modal` | usuario (corregir bloqueantes e importantes, 2026-10-09) |
