# Revisión de las opciones de diseño · spec 003 · ronda 2

Opciones generadas el 2026-10-09 siguiendo `skills/init/references/design.md` §2.4 del plugin ai-dd
v1.11.2: brief §5 (`brief-spec.md`) → canvas con el tipo Design (enlace en
`.ai/project.yaml → design.canvas`) → cada opción también en HTML desde `option.html`
(`opcion-a.html`, `opcion-b.html`, `opcion-c.html`). Antes de presentarlas: contraste calculado por
cada página (0 pares "no cumple") y revisión con `design:design-critique` y
`design:accessibility-review`. Las de la ronda 1 están en `descartadas-r1/`.

## Design Critique

### Impresión general
Tres direcciones distintas de verdad. **A** confía en la estructura: índice lateral y fichas. **B**
pone la tarea principal en el hero con el panel "¿Qué necesita tu cultivo?". **C** está pensada para
el sol y la mano: tipografía grande, bordes gruesos y botones con relieve. Las tres respetan la spec:
1/2/3 columnas en 360/768/1440 px, contacto sin formulario y la categoría siempre escrita.

### Usabilidad
| Hallazgo | Opción | Severidad | Recomendación | Estado |
|---|---|---|---|---|
| En teléfono, el panel de categorías (la idea central de B) quedaba detrás de la ilustración, en la segunda pantalla; en computadora dejaba un hueco a la derecha | B | 🟡 Moderado | Orden: texto → panel → ilustración a todo el ancho | corregido en el canvas y en el HTML |
| Las fichas de A salían en 2 y 1 columnas a 1440 y 768 px, contra CA15 | A | 🔴 Crítico (incumple la spec) | Rejilla de 3/2/1 columnas, imagen arriba | corregido antes de terminar el canvas |
| B ofrece dos formas de elegir categoría (atajos del hero y filtro) | B | 🟢 Menor | Ambas deben dejar el mismo filtro activo; a resolver en `/plan --fix` si se elige B | pendiente (solo si se elige B) |
| El índice lateral de A desaparece por debajo de 1024 px | A | 🟢 Menor | Menú desplegable con el mismo orden; ya previsto en Estados A | aceptado |

### Jerarquía visual
- **Lo primero que se ve:** A, el titular verde y la lámina de la parcela; B, el titular y el panel de categorías; C, la ilustración y la placa con el titular.
- **Recorrido:** el mismo en las tres: Inicio → Nosotros → Productos → Uso seguro → Contacto (CA3, CA6).
- **Énfasis:** "Ver productos" es la acción principal en las tres; en C también "Llamar".

### Consistencia
| Elemento | Hallazgo | Recomendación |
|---|---|---|
| Franjas de categoría | Cuatro colores iguales en las tres opciones (vienen de la etiqueta) | Mantenerlos al elegir; pasan a `system.md` |
| Iconos | En el canvas y en los HTML son trazos en línea; en la página real serán Font Awesome (P5) | Equivalencias en `/plan --fix` |

### Lo que funciona
- Contenido real en todas las pantallas, sin lorem ipsum; los datos de contacto están marcados como de ejemplo.
- Ningún rasgo de §6 ni de `anti-cliches.md`: sin degradados, sin etiquetas en mayúsculas espaciadas, sin numeración decorativa.

## Accessibility Audit
**Estándar:** WCAG 2.1 AA · **Fecha:** 2026-10-09 · **Método:** escaneo en Chromium de los marcos de 360, 768 y 1440 px de cada HTML (225–256 textos por opción) y pares de contraste de la sección Color.

### Resumen
**Hallazgos:** 0 críticos · 0 mayores · 0 menores tras la corrección de B.

| Comprobación | A | B | C |
|---|---|---|---|
| Pares de contraste de "Color" que no cumplen | 0 | 0 | 0 |
| Textos visibles bajo 4.5:1 (3:1 grandes) | 0 | 0 | 0 |
| Botones y enlaces < 44 × 44 px (sin contar los del pie ni los enlaces dentro de un párrafo) | 0 | 0 | 0 |
| Imágenes sin texto alternativo | 0 | 0 | 0 |
| Desbordes horizontales a 360/768/1440 | 0 | 0 | 0 |

### Por verificar en la implementación
- Teclado y foco del `<dialog>` real (E10) y del menú (E4); lector de pantalla (NVDA/VoiceOver) en `/review`.
