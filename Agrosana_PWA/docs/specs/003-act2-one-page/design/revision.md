# Revisión de las opciones de diseño · spec 003 · ronda 3

Opciones generadas el 2026-10-09 con `/init --upgrade --redo-options` del plugin ai-dd **1.11.4**
(`skills/init/references/design.md` §2.7 → §2.3–§2.4): brief actualizado → canvas con el tipo Design
(https://claude.ai/artifact/RNYSKiMdXyBGGESJcFrsjX, en `.ai/project.yaml → design.canvas`) → cada
opción también en HTML desde `option.html` (`opcion-a.html`, `opcion-b.html`, `opcion-c.html`), con
la fuente de marca incrustada en woff2 (`@fontsource` 5.3.0). Las rondas 1 y 2 están en `history/`.

Antes de presentarlas: pares de "Color" calculados por cada página (0 "no cumple"), fuentes
comprobadas como cargadas con `document.fonts`, repaso contra §6 y `anti-cliches.md`, y
`design:design-critique` y `design:accessibility-review` sobre las tres.

## Opciones

| Opción | Idea | Momento firma | Riesgo | Qué cambia respecto a la ronda 2 |
|---|---|---|---|---|
| **A · La etiqueta** (`opcion-a.html`) | La página se lee como la etiqueta de un envase: hero enmarcado con los datos de la casa y una franja de categorías como atajo; Uso seguro sube al 2.º lugar como bloque de precauciones; cada producto es una etiqueta con su franja | La franja de categorías se imprime de izquierda a derecha (600 ms) | Bordes de 3 px y amarillo de precaución: presencia dura; el amarillo se reserva para precauciones | Deja la ficha técnica y el índice lateral: el elemento reconocible es la etiqueta (marco, franja de color, amarillo de precaución). Orden nuevo: Uso seguro antes que Productos. Barlow Condensed incrustada en lugar de Bahnschrift del sistema |
| **B · El anaquel** (`opcion-b.html`) | Los productos reales son el héroe: repisa con las cinco fotos de etiqueta y una etiqueta colgante (nombre y categoría) que lleva a Productos; Productos va justo después, con uno destacado; Nosotros y Contacto se unen en "La casa" | Las etiquetas colgantes se balancean una vez (−6° → 3° → 0°, 700 ms, escalonadas) | Depende de fotos de fondos distintos (se igualan con altura fija y sombra); en 360 px la repisa ocupa tres filas | Sin hero de texto con panel de categorías: el hero es el anaquel con producto real. Composición nueva (Nosotros + Contacto juntos). Bricolage Grotesque + Work Sans en lugar de Trebuchet; verde repisa y kraft en lugar de verde + maíz |
| **C · La ruta de reparto** (`opcion-c.html`) | La página es la ruta de AgroSana por Zihuatanejo, Petatlán y La Unión: titular enorme junto al mapa de la ruta; una línea vertical une las secciones como paradas numeradas; Contacto es la última parada con el teléfono en grande | La línea del mapa se dibuja desde Zihuatanejo (900 ms) y el riel de paradas se completa al bajar | El riel ocupa una columna en computadora y se reduce en teléfono; el mapa es esquemático (se dice en el pie) | Deja "Campo al sol" (Verdana, botones con relieve, ilustración del campo): la idea sale del lugar real del brief. Epilogue + Source Sans 3 incrustadas; acento turquesa en lugar del lima |

Las tres cambian la composición de la pantalla principal entre sí (panel enmarcado / repisa de
producto / titular + mapa) y frente a la ronda 2; las tres mantienen la spec: secciones `inicio`,
`nosotros`, `productos`, `uso-seguro` y `contacto`, h1, imagen con alt, "Ver productos", 3 tarjetas
en Nosotros (CA7), filtro con "Mostrando 5 productos" y rejilla de 3/2/1 columnas, "Ver más
precauciones", contacto con `tel:` y `mailto:` con asunto y la nota de datos de ejemplo, y la
advertencia "Lee siempre la etiqueta".

## Design Critique

### Impresión general
Por primera vez cada opción tiene un elemento que se recuerda: la franja de etiqueta (A), el anaquel
con producto real (B) y la ruta por la Costa Grande (C). La audacia se gasta en un solo elemento y
el resto es sobrio.

### Usabilidad
| Hallazgo | Opción | Severidad | Recomendación | Estado |
|---|---|---|---|---|
| En 768 px, el botón "Llamar" se estiraba en la cabecera al ocultarse el menú | B | 🟡 Moderado | Alinear a la derecha | corregido |
| La etiqueta "Bioestimulantes" no cabía en la etiqueta colgante a 768 px | B | 🟡 Moderado | Guion suave (`Bioestimu&shy;lantes`), texto a 16 px | corregido |
| La cabecera de color de las fichas de A perdía el relleno (el estilo del párrafo de la ficha la pisaba) | A | 🟢 Menor | Cabecera como `div` | corregido |
| El rótulo "Petatlán" del mapa quedaba encima de la línea | C | 🟢 Menor | Rótulo bajo el punto, con halo | corregido |
| En 360 px la repisa de B ocupa tres filas antes de Productos | B | 🟢 Menor | Aceptado: el anaquel es la idea; las etiquetas ya llevan a Productos | aceptado |
| Los rótulos del mapa de C son texto dentro de una imagen SVG (fuente del sistema) | C | 🟢 Menor | Si se elige C: rótulos en HTML sobre el mapa o trazados, con la fuente incrustada | pendiente (solo si se elige C) |

### Jerarquía visual
- **Lo primero que se ve:** A, el titular verde en el panel enmarcado y la franja de colores; B, el titular y la repisa con los cinco productos; C, el titular enorme y el mapa.
- **Recorrido:** A Inicio → Uso seguro → Productos → Nosotros → Contacto; B Inicio → Productos → Uso seguro → La casa; C Inicio → Nosotros → Productos → Uso seguro → Contacto (paradas 1–4). El menú sigue el orden de cada página.
- **Énfasis:** "Ver productos" es la acción principal en las tres; B añade "Llamar" en la cabecera y C el teléfono en la cabecera y a 72 px en la última parada.

### Repaso contra §6 y `anti-cliches.md`
| Rasgo | Hallazgo | Estado |
|---|---|---|
| Fuentes del sistema como marca | Ninguna: Barlow, Bricolage/Work Sans y Epilogue/Source Sans 3 incrustadas | cumple |
| Botones y filtros en píldora | B los tenía en píldora | corregido: radio de 8 px |
| Metadatos unidos con puntos medios | Categoría · composición en B y C, pie y lugares de C | corregido: la composición va en el texto; pie y lugares con comas |
| Numeración decorativa | B numera 01–04 en Uso seguro; C numera las paradas | aceptado: son secuencias reales (orden de uso del producto; orden de la ruta), y B lo dice en el subtítulo |
| Tríada icono + título + texto en Nosotros | Presente en las tres por CA7 | excepción de `anti-cliches.md`: A destaca la primera a doble ancho y en verde; B la convierte en una frase grande + dos tarjetas; C en filas con la primera destacada |
| Clichés del sector (manos, hojas, moléculas, agricultor) | Ninguno: solo fotos de etiqueta, pictogramas de precaución y el mapa | cumple |
| Mismo esqueleto con otra piel | No: tres composiciones distintas | cumple |

### Lo que funciona
- Contenido real en todas las pantallas; los datos de contacto están marcados como de ejemplo.
- La categoría siempre va escrita (nunca solo color).

## Accessibility Audit
**Estándar:** WCAG 2.1 AA · **Fecha:** 2026-10-09 · **Método:** Chromium sobre los marcos de 360, 768 y 1440 px de cada HTML y pares de contraste de la sección Color.

| Comprobación | A | B | C |
|---|---|---|---|
| Pares de "Color" que no cumplen | 0 de 15 | 0 de 13 | 0 de 14 |
| Botones y enlaces < 44 × 44 px | 0 (tras agrandar los enlaces del pie) | 0 | 0 |
| Imágenes sin `alt` | 0 | 0 | 0 |
| Saltos de nivel de encabezado / h1 | 0 / 1 | 0 / 1 | 0 / 1 |
| Botones o enlaces sin nombre accesible | 0 | 0 | 0 |
| Texto más pequeño | 16 px (tras subir `--text-small` de 15 a 16, brief: texto ≥ 16 px) | 16 px (ídem) | 16 px |
| Desbordes horizontales a 360/768/1440 | 0 | 0 | 0 |
| Fuente de marca cargada (`document.fonts`) | sí | sí | sí |

### Por verificar en la implementación
- Teclado y foco del `<dialog>` (E10) y del menú (E4); `prefers-reduced-motion` del momento firma; lector de pantalla en `/review`.
- Iconos: en el canvas son trazos en línea; en la página real, Font Awesome (P5).

## Elección y ronda de tipografía (2026-10-09)

El usuario eligió **A · La etiqueta** como base y pidió, antes de §2.5, una ronda solo de tipografía
sobre A: `tipografia-a.html`. Paso añadido a petición del usuario (el plugin no tiene una ronda de
tipografía; la lámina sigue las reglas de §2.4: fuentes incrustadas, contenido real, `@container` y
contraste calculado en la página).

- **Fijo:** composición, color, forma, espaciado y textos de A. Los valores tipográficos que A tenía
  escritos a mano (34, 26 y 22 px, pesos 600/700/800, interlineado .95) pasan a tokens con los mismos
  valores; solo cambian esos tokens y el bloque de fuentes.
- **Parejas (títulos + texto):** 1) Archivo ancho 75 + Atkinson Hyperlegible; 2) Libre Franklin +
  Atkinson Hyperlegible; 3) IBM Plex Sans Condensed + IBM Plex Sans. Los tamaños de título se ajustan
  por familia para conservar la composición: el titular ocupa 3 líneas a 360 px y 2 a 1440 px en
  las tres, como en A.
- **Comprobado en Chromium:** las cinco familias cargadas (`document.fonts`); 103 textos por pareja en
  360 y 1440 px, mínimo 5.68:1 y ninguno bajo su umbral (4.5:1, o 3:1 en texto grande); sin desbordes
  a 360 px y ningún texto bajo 16 px.
- **Por revisar al elegir:** Atkinson solo tiene 400/700 (sin 600) y su cero lleva barra; Plex
  Condensed llega a 700, no a 800; Libre Franklin obliga a títulos más pequeños (60/38 px).

