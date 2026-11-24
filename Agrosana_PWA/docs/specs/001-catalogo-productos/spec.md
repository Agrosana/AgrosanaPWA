---
id: 001
slug: catalogo-productos
status: inferred
confidence: alta
created: 2026-10-08
extends: []
---

# 001 · Catálogo de productos (página legado)

## Problema
AgroSana necesita mostrar a agricultores de la región los productos que vende (fungicidas,
herbicidas, fertilizantes y coadyuvantes) con su imagen y nombre, en una sola página.

## Historias de usuario
- Como agricultor, quiero ver los productos que ofrece AgroSana con su foto para saber qué puedo comprar.

## Criterios de aceptación
<!-- Spec inferida: [x] = cubierto por un test existente; [ ] = comportamiento observado en el código, sin test. -->
- [ ] CA1 · Dado que abro `index.html`, cuando carga, entonces veo un encabezado verde con "AGROSANA", el lema "El agricultor", el texto "-Fungicidas, Herbicidas, -" y "Propietario: Aaron Saligan".
- [ ] CA2 · Dado que abro `index.html`, cuando carga, entonces veo tarjetas con imagen y nombre de Frutime, Bio-Ph, HydroSpeed, Surfatek y Prozycar.
- [ ] CA3 · Dado un puntero sobre una tarjeta, cuando lo paso por encima, entonces la tarjeta se eleva 5 px.
- [ ] CA4 · Dada una pantalla estrecha, cuando cargo la página, entonces las tarjetas de 250 px se reacomodan en filas (flex-wrap).

## Fuera de alcance
- Precios, fichas técnicas, compra en línea y navegación hacia otras páginas.

## Seguridad y privacidad
- Datos sensibles involucrados: ninguno.
- Quién puede hacer qué: cualquier visitante solo lee contenido público.
- Casos de abuso: No aplica: la página no tiene entradas ni datos.

## Requisitos no funcionales
- Ninguno declarado.

## Preguntas abiertas

## Decisiones
| Fecha | Tipo | Pregunta / conflicto | Decisión | Fuente |
|---|---|---|---|---|
| 2026-10-08 | implícita | ¿Se documenta el diseño actual? | No; el diseño se define en la spec de cada actividad | `.ai/project.yaml` → design.status |

## Notas para /plan
- Página legado; las mejoras van en specs nuevas con `extends: [001]`.

## Evidencia (solo si status=inferred)
- Archivos: `antiguo/index.html`, `antiguo/style.css` (bloque inicial "HEADER/PRODUCTOS/TARJETAS"), `antiguo/img/producto1-5.jpg`
- Tests: sin tests

## Observaciones (solo si status=inferred)
- Hay 7 tarjetas: la 6.ª y la 7.ª repiten "Surfatek" y "Prozycar" y apuntan a `img/producto6.jpg` y `img/producto7.jpg`, que no existen (imagen rota).
- Todas las imágenes tienen `alt=""` aunque son de contenido (incumple P7 para código nuevo).
- La etiqueta de HydroSpeed dice "HydroSpeed CaB-Max" y la de Bio-Ph "Bio pH".
- `style.css` incluye una segunda hoja (práctica guiada, colores azules) que redefine `body` y `header`: la página hereda `line-height`, `color` y fondos de esa segunda hoja.
- `app.js` no se carga.

## Historial
| Fecha | Cambio | Motivo |
|---|---|---|
| 2026-10-08 | Creada por /init | Documentar código existente |
