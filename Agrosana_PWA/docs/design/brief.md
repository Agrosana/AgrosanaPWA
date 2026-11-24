---
created: 2026-10-08
updated: 2026-10-09     # --redo-options, ronda 3
options: 3        # el usuario mantiene el verde de marca y aun así pidió 3 (decisión del usuario, 2026-10-08)
---

# Brief de diseño de AgroSana

Respuestas de la entrevista de diseño (Ronda 4b), hecha para la spec 003 porque el proyecto no tenía
sistema de diseño. Lo usan las opciones y `creative-direction.md`; no se edita después de elegir
(los cambios van al sistema).

## Objetivo
Transmitir **confianza técnica**: que el agricultor sienta que trata con una casa agroquímica seria,
que conoce sus productos y le dice cómo usarlos con seguridad (decisión del usuario, 2026-10-08).
La página debe dejar ver de inmediato qué vende AgroSana y cómo contactarla, y **recordarse**: las
rondas 1 y 2 se rechazaron por genéricas y con poco impacto (decisión del usuario, 2026-10-09).

## Público y contexto de uso
Agricultores y trabajadores del campo de la Costa Grande de Guerrero (Zihuatanejo, Petatlán,
La Unión). Mayormente desde el teléfono, muchas veces al aire libre y a pleno sol (contraste alto,
texto ≥ 16 px), a veces con una mano y con conexión irregular; también el profesor que evalúa la
práctica desde computadora.

## Marca y color
Se mantiene el **verde** del sitio actual (`#1b7d1b` en `antiguo/style.css`) como color de marca
(decisión del usuario, 2026-10-08). Las opciones pueden variar el tono del verde y el acento.
Evitar: el azul de la plantilla de la práctica guiada y el verde chillón (cliché del sector).

## Tipografía y modo
Sin preferencia de estilo del usuario. **Tipografía de marca elegida e incrustada** (archivo de
fuente servido desde `act2/`, sin CDN: no es un recurso externo para la constitución P4); las
fuentes del sistema ya no valen como marca (plugin 1.11.3). Solo modo claro (lectura al sol).

## Referencias
- Gustan: el usuario no dio referencias con nombre (2026-10-09); las opciones proponen las suyas y las nombran.
- No gustan: las rondas 1 y 2 de esta spec (`docs/specs/003-act2-one-page/design/history/`): parecidas entre sí, genéricas y sin impacto; la mezcla verde/azul del sitio actual.

## Concepto firma y clichés del sector
- Concepto firma: ninguno: lo proponen las opciones (decisión del usuario, 2026-10-09). Cada opción es una dirección con su propia idea y su momento firma.
- Clichés del sector a evitar (decisión del usuario, 2026-10-09): fotos stock de manos con brotes o tractores; verde chillón y hojas decorativas; moléculas y gotas "científicas" como adorno; agricultor estereotipado como imagen de marca.

## Movimiento y densidad
Movimiento sobrio salvo un único momento firma por opción. Densidad media.

## Librería de componentes
Ninguna: HTML, CSS y JavaScript propios (ADR 0002). Iconos de Font Awesome (ADR 0004).

## Contenido real para las opciones
Textos y productos de la spec 003 y de `act2/index.html`: hero "Insumos para el campo de la Costa
Grande", Nosotros, los cinco productos (Frutime, Bio pH, HydroSpeed CaB-Max, Surfatek, Prozycar) con
su categoría y foto de etiqueta, recomendaciones de Uso seguro y datos de contacto de ejemplo.

## Decisiones
| Fecha | Tipo | Pregunta / conflicto | Decisión | Fuente |
|---|---|---|---|---|
| 2026-10-08 | implícita | Nivel de accesibilidad | WCAG 2.1 AA: contraste ≥ 4.5:1, foco visible, toque ≥ 44 px | docs/constitution.md P7 |
| 2026-10-08 | implícita | Anchos de comprobación | 360, 768 y 1440 px | docs/constitution.md P6 |
| 2026-10-08 | diseño | Número de opciones con marca fija | 3 (el plugin propone 2 con marca cerrada) | usuario |
| 2026-10-09 | diseño | ¿Qué falló en la ronda 2? | Se parecen entre sí, se ven genéricas / de plantilla, poco impacto visual | usuario |
| 2026-10-09 | diseño | ¿Qué se conserva? | Nada: empezar de cero | usuario |
| 2026-10-09 | diseño | Concepto firma | Ninguno: cada opción propone su dirección | usuario |
| 2026-10-09 | diseño | Clichés del sector | Manos con brotes, verde chillón y hojas, moléculas/gotas, agricultor estereotipado | usuario |
| 2026-10-09 | implícita | Fuentes del sistema como marca | Ya no valen; fuente incrustada desde `act2/` | plugin 1.11.3, `design.md` §2.4.3 |
| 2026-10-09 | contradicción | spec 003 CA7 (3 tarjetas icono + título + texto en Nosotros) frente a anti-cliches.md (tríada prohibida) | Se mantiene CA7: la spec tiene más rango; las opciones resuelven las 3 tarjetas sin aspecto de plantilla (distinta jerarquía o forma) | usuario |
| 2026-10-09 | diseño | Canvas de la ronda 2 | https://claude.ai/artifact/KJZWsLR8rBzXuqBbDZmQyp (archivado; el de la ronda 3 lo sustituye en `design.canvas`) | `design.md` §2.7.4 |
| 2026-10-09 | diseño | Canvas de la ronda 3 | https://claude.ai/artifact/RNYSKiMdXyBGGESJcFrsjX (en `design.canvas`); opciones A · La etiqueta, B · El anaquel, C · La ruta de reparto | `design.md` §2.7.4 |
| 2026-10-09 | diseño | Elección de la ronda 3 | Opción A · La etiqueta como base; antes de §2.5, una ronda solo de tipografía sobre A (composición, color y textos fijos) con tres parejas: Archivo condensada + Atkinson Hyperlegible, Libre Franklin + Atkinson Hyperlegible, IBM Plex Sans Condensed + IBM Plex Sans | usuario |
| 2026-10-09 | diseño | Pareja tipográfica de A | 3 · IBM Plex Sans Condensed + IBM Plex Sans (`tipografia-a.html`); sistema en `system.md` (draft) | usuario |
