# Revisión de las opciones de diseño · spec 003

Hecha el 2026-10-08 con el plugin `design` de Anthropic (`design:design-critique` y
`design:accessibility-review`), según `skills/init/references/design.md` §2.4 del plugin ai-dd
v1.11.2. Los hallazgos graves se corrigieron **antes** de presentar las opciones.

## Design Critique

### Impresión general
Las tres transmiten la confianza técnica del brief y respetan el verde de marca. A es la más
identitaria (la etiqueta), B la más rápida de escanear (catálogo primero) y C la más legible al sol.
La mayor oportunidad común era la zona de contacto, que en el teléfono tenía objetivos de toque pequeños.

### Usabilidad
| Hallazgo | Opción | Severidad | Recomendación | Estado |
|---|---|---|---|---|
| Enlaces de teléfono y correo de Contacto de 24 px de alto (< 44 px exigidos por P7 y el plan A11) | A, B, C | 🔴 Crítico | Enlaces `inline-flex` con `min-height: var(--touch-min)` | corregido |
| Enlaces del menú de 40 px de ancho ("Inicio") | A, B, C | 🟡 Moderado | `min-width: var(--touch-min)` | corregido |
| Miniaturas de 72 px en las filas del catálogo en teléfono: cuesta reconocer el envase | B | 🟡 Moderado | Si se elige B, subir a 96 px en `/implement` | pendiente (solo si se elige B) |
| El hero a 1440 px deja media banda vacía a la derecha | C | 🟢 Menor | Si se elige C, pasar la ilustración a la derecha desde 1024 px | pendiente (solo si se elige C) |

### Jerarquía visual
- **Lo primero que se ve:** A y C, el titular verde y la ilustración de surcos (correcto: qué es AgroSana). B, el titular y la ficha de datos reales (correcto para "confianza técnica").
- **Recorrido:** A y C, hero → Nosotros → Productos; B, hero → Productos → Nosotros (la tarea principal antes).
- **Énfasis:** la categoría siempre va escrita además del color (no solo color).

### Consistencia
| Elemento | Hallazgo | Recomendación | Estado |
|---|---|---|---|
| Metadatos del hero de B | "Lun–Sáb · 8:00–18:00", con puntos medios (cliché de `anti-cliches.md`) | "Lunes a sábado, 8:00 a 18:00" | corregido |
| Botones-enlace | Texto subrayado dentro de los botones | `text-decoration: none` en `a.c-btn` | corregido |
| Botón de menú de A | Fondo blanco del navegador sobre el encabezado verde | Fondo transparente y borde del color del texto | corregido |

### Lo que funciona
- Franjas de color por categoría (A y C) y etiquetas de categoría con texto, en las tres.
- Contenido real en todas las pantallas; sin lorem ipsum ni cifras inventadas.

## Accessibility Audit
**Estándar:** WCAG 2.1 AA · **Fecha:** 2026-10-08 · **Método:** escaneo automático en Chromium de los marcos de 360, 768 y 1440 px y de la sección Componentes (243–270 textos por opción), más pares de contraste calculados por la propia página.

### Resumen
**Hallazgos:** 4 · **Críticos:** 1 · **Mayores:** 1 · **Menores:** 2 · todos corregidos.

| # | Hallazgo | Criterio | Severidad | Opción | Estado |
|---|---|---|---|---|---|
| 1 | Objetivos de toque de teléfono y correo < 44 px | 2.5.5 | 🔴 Crítico | A, B, C | corregido |
| 2 | "© 2026 AgroSana." con color secundario sobre el pie oscuro (1.84:1 y 1.29:1) | 1.4.3 | 🟡 Mayor | A, C | corregido |
| 3 | Borde de control a 2.98:1 sobre superficie | 1.4.11 | 🟢 Menor | A | corregido (token `--color-border` #7A8A75) |
| 4 | "Texto sobre acento" a 2.79:1 | 1.4.3 | 🟢 Menor | B | corregido (acento #DCE9D8) |

### Comprobaciones sin hallazgos
- Contraste de todos los textos visibles: 0 fallos tras las correcciones.
- Texto alternativo: todas las imágenes lo tienen.
- Nombre accesible: todos los botones y enlaces (el de menú, con `aria-label`).
- Reflujo a 320 px (equivale a zoom 200 % en 640 px): sin desbordes.
- Información por color: la categoría siempre va escrita.

### Por verificar en la implementación (no aplica a maquetas)
- Teclado y foco del `<dialog>` real (E10) y del menú (E4); lector de pantalla con NVDA o VoiceOver (verificación manual de `/review`).
