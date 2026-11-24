---
id: 003
slug: act2-one-page
status: implemented
created: 2026-10-08
extends: []
---

# 003 · Actividad 2: aplicación web One Page de AgroSana

## Problema
Para la práctica en equipo "Desarrollo de una Aplicación Web One Page" el equipo debe publicar,
en una URL con HTTPS dentro de la carpeta `act2`, una página única sobre un tema común. El tema es
AgroSana, planta agroquímica de Zihuatanejo: hoy su sitio es un catálogo sin navegación, con
imágenes rotas, una página de contacto sin estilos y nada usable en el teléfono. Los agricultores
de la región no pueden conocer los productos, recomendaciones de uso seguro ni cómo contactar a la
empresa desde cualquier dispositivo. La spec atiende el riesgo RS1 **parcialmente** (el formulario
legado queda para el objetivo 3 del roadmap).

## Historias de usuario
- Como agricultor, quiero entender en segundos qué ofrece AgroSana y llegar a cualquier sección desde el menú para encontrar lo que busco.
- Como agricultor, quiero ver los productos con su foto, filtrarlos por tipo y abrir el detalle de uno para decidir qué consultar.
- Como trabajador del campo, quiero leer recomendaciones de uso seguro de agroquímicos para protegerme al aplicarlos.
- Como cliente, quiero ver los datos de contacto y pedir asesoría con un toque para comunicarme con la empresa.
- Como visitante desde el teléfono, quiero que la página se lea y se use bien en una pantalla pequeña para no tener que hacer zoom.
- Como profesor evaluador, quiero que la entrega cumpla la estructura y los requisitos de la práctica para calificarla.

## Criterios de aceptación
- [x] CA1 · Dado el sitio publicado, cuando abro `/act2/`, entonces se muestra la página completa y todo lo que usa (estilos, comportamiento e imágenes) está dentro de la carpeta de la actividad con la estructura de la constitución (P3), servido tal cual, sin paso de construcción.
- [x] CA2 · Dada cualquier posición de desplazamiento, cuando miro la parte superior, entonces veo el logotipo y el nombre "AgroSana" en el encabezado.
- [x] CA3 · Dado el menú de navegación, cuando elijo Inicio, Nosotros, Productos, Uso seguro o Contacto, entonces la página se desplaza a esa sección sin salir de la página y la dirección termina en el ancla de la sección.
- [x] CA4 · Dada una pantalla de 768 px o menos, cuando pulso el botón de menú, entonces los enlaces se muestran y el botón indica que el menú está abierto; al pulsarlo de nuevo o elegir un enlace, el menú se cierra.
- [x] CA5 · Dado que abro la página, cuando veo la sección principal, entonces tiene un título, una descripción, una imagen con texto alternativo y un botón "Ver productos" que lleva a la sección Productos.
- [x] CA6 · Dada la página, cuando la recorro, entonces encuentro al menos tres secciones de contenido del tema además de la principal y la de contacto: Nosotros, Productos y Uso seguro.
- [x] CA7 · Dada la sección Nosotros, cuando la veo, entonces hay al menos tres tarjetas, cada una con icono, título y texto.
- [x] CA8 · Dada la sección Productos, cuando la veo, entonces hay una tarjeta por cada uno de los cinco productos (Frutime, Bio pH, HydroSpeed CaB-Max, Surfatek, Prozycar) con foto, nombre, categoría y descripción breve.
- [x] CA9 · Dados los botones de categoría (Todos, Fertilizantes, Fungicidas, Coadyuvantes, Bioestimulantes), cuando elijo uno, entonces solo quedan visibles los productos de esa categoría, el botón elegido se marca como activo y se anuncia cuántos productos se muestran; "Todos" vuelve a mostrar los cinco.
- [x] CA10 · Dado un producto, cuando pulso "Ver detalles", entonces se abre una ventana con su foto, nombre, categoría, para qué sirve y la indicación de leer la etiqueta; se cierra con el botón de cerrar, al pulsar fuera de ella o con la tecla Esc, y el foco vuelve al botón que la abrió.
- [x] CA11 · Dada la sección Uso seguro, cuando la abro, entonces veo al menos cuatro recomendaciones y un botón "Ver más"; al pulsarlo aparecen recomendaciones adicionales y el botón cambia a "Ver menos"; al pulsarlo de nuevo se ocultan.
- [x] CA12 · Dada la sección Contacto, cuando la veo, entonces aparecen teléfono, correo, ubicación y horario con su icono; el teléfono se puede marcar con un toque y el botón "Solicitar asesoría" abre el correo del visitante con el destinatario y el asunto ya escritos; la página no pide ni guarda datos personales.
- [x] CA13 · Dado el final de la página, cuando lo veo, entonces hay un pie con el nombre de la empresa, el año, enlaces a las secciones y el aviso de leer siempre la etiqueta.
- [x] CA14 · Dada la página, cuando reviso sus iconos, entonces todos provienen de la librería de iconos aprobada (P5) y no hay ningún emoji.
- [x] CA15 · Dado un ancho de 360, 768 o 1440 px, cuando cargo la página, entonces no hay desplazamiento horizontal y las tarjetas se acomodan en una, dos o tres columnas según el espacio.
- [x] CA16 (abuso) · Como visitante malintencionado, intento que la página muestre contenido propio escribiendo código en la dirección (ancla o parámetros) → la página no lo interpreta ni lo inserta.
- [x] CA17 (abuso) · Como atacante que altera un recurso de terceros que la página carga, intento ejecutar código en ella → el navegador rechaza el recurso alterado porque no coincide con su huella de integridad.
- [x] CA18 · Dado que navego e interactúo con todas las funciones, cuando reviso la consola del navegador, entonces no hay errores, mensajes de depuración ni recursos que no carguen.

## Fuera de alcance
- Manifiesto de aplicación, Service Worker, caché, funcionamiento sin conexión e instalación como PWA (actividad posterior; constitución P8).
- Formulario que envíe mensajes, carrito, precios, existencias o compra en línea.
- Dosis, mezclas o instrucciones de aplicación de productos (solo se remite a la etiqueta y a un asesor).
- Corregir las páginas legado de `antiguo/` (objetivo 3 del roadmap).
- Mostrar a los integrantes del equipo.

## Seguridad y privacidad
- Datos sensibles involucrados: ninguno; la página no pide ni guarda datos personales (CA12).
- Quién puede hacer qué: cualquier visitante solo lee e interactúa con contenido público.
- Casos de abuso:
  - Como visitante malintencionado, intento inyectar contenido mediante la dirección → no se interpreta (CA16).
  - Como atacante de un proveedor de recursos externos, intento alterar un recurso → se rechaza (CA17).

## Cobertura de riesgos
| Corrección | Alcance | Criterios / motivo y destino |
|---|---|---|
| RS1.a — Los formularios nuevos dicen que no envían datos o no piden datos personales | dentro | CA12 |
| RS1.b — Corregir o retirar el formulario de `contacto.html` | fuera | página legado fuera del alcance de la actividad → roadmap objetivo 3 |
| RS2.a — Todo recurso de CDN lleva verificación de integridad | dentro | CA17 |
| OB1.a — El JavaScript nuevo no deja mensajes de depuración en consola | dentro | CA18 |
| RD1.a — Las herramientas viven solo en `tests/`; la raíz se publica sin construcción | dentro | CA1 |

## Diseño
Debe transmitir confianza técnica y cercanía con el campo: limpio, verde, fácil de leer bajo el sol
desde un teléfono. Toca una sola pantalla (la página `act2`). Usa el sistema de diseño aprobado
[docs/design/system.md](../../design/system.md) (opción A · La etiqueta con IBM Plex; vista en
`docs/design/system.html`): colores, tipografía y componentes salen de ahí.

## Requisitos no funcionales
- Accesibilidad WCAG 2.1 AA básica (constitución P7): imágenes con texto alternativo, contraste ≥ 4.5:1, operable con teclado y foco visible, objetivos de toque ≥ 44 px.
- La página es utilizable en 360, 768 y 1440 px (P6, CA15).
- Sin errores de consola ni recursos rotos (P10, CA18).
- La interfaz usa solo los tokens y componentes del sistema de diseño aprobado (`docs/design/system.md`, constitución P12).
- La tipografía de marca (IBM Plex) se sirve desde `act2/`, sin servicios de fuentes externos (P4).
- Un solo momento animado (la franja de categorías), con versión estática equivalente cuando el visitante pide reducir el movimiento.

## Preguntas abiertas

## Decisiones
| Fecha | Tipo | Pregunta / conflicto | Decisión | Fuente |
|---|---|---|---|---|
| 2026-10-08 | implícita | Tema de la página | AgroSana, planta agroquímica | `.ai/project.yaml`, descripción del proyecto |
| 2026-10-08 | implícita | Estructura de carpetas y archivos | La de P3 en `act2/` | `docs/constitution.md` P3 |
| 2026-10-08 | implícita | Iconos | Librería aprobada, sin emojis | `docs/constitution.md` P5 |
| 2026-10-08 | implícita | PWA | Fuera de alcance | `docs/constitution.md` P8 |
| 2026-10-08 | brecha | ¿La página legado se reemplaza? | No; `act2/` es nueva y reutiliza productos e imágenes | usuario |
| 2026-10-08 | brecha | ¿Dónde queda el código antiguo? | Se mueve a `antiguo/`; en la raíz quedan `act2/`, `tests/` y la documentación del flujo (decisión del usuario, 2026-10-08) | usuario |
| 2026-10-08 | brecha | ¿Se muestran integrantes del equipo? | No | usuario |
| 2026-10-08 | supuesto | Contacto sin formulario | Datos de contacto, enlace para llamar y botón de correo prellenado: cumple "contacto o llamada a la acción" sin pedir datos personales (RS1.a) | /specify |
| 2026-10-08 | supuesto | Datos de contacto | Teléfono 755 000 0000, correo contacto@agrosana.com, Zihuatanejo, Guerrero (los del sitio actual; el teléfono parece de ejemplo) | `contacto.html` |
| 2026-10-08 | supuesto | Descripción y categoría de cada producto | Tomadas de sus etiquetas: Frutime (bioestimulante), Bio pH (coadyuvante acidificante), HydroSpeed CaB-Max (fertilizante de calcio y boro), Surfatek (coadyuvante surfactante), Prozycar (fungicida, carbendazim 50 %) | `antiguo/img/producto1-5.jpg` |
| 2026-10-08 | supuesto | Horario de atención | Lunes a sábado, 8:00 a 18:00 | /specify |
| 2026-10-08 | supuesto | No se muestra el propietario | La página presenta a la empresa, no a personas | /specify |
| 2026-10-08 | brecha | ¿Teléfono y correo son reales? (/analyze A10) | Se usan los del sitio actual y la página los marca como datos de ejemplo (decisión del usuario, 2026-10-08) | usuario |
| 2026-10-08 | brecha | Spec grande (18 criterios): ¿dividir? | Mantenerla junta: es una sola entrega (decisión del usuario, 2026-10-08) | usuario |
| 2026-10-09 | brecha | ¿Los requisitos del sistema de diseño van en la spec? (/analyze A35) | Sí, como requisitos no funcionales (decisión del usuario, 2026-10-09) | usuario |
| 2026-10-09 | diseño | ¿De dónde salen paleta, tipografía y componentes? | Del sistema de diseño aprobado `docs/design/system.md` (opción A + IBM Plex), no de `/plan` (decisión del usuario, 2026-10-09) | usuario |

## Notas para /plan
- Requisitos literales de la práctica: `act2/index.html`, `act2/css/estilos.css`, `act2/js/app.js`, `act2/img/`; HTML, CSS y JavaScript; Font Awesome para iconos; al menos una función interactiva con JavaScript (aquí: menú móvil, filtro, ventana modal y "Ver más").
- Publicación en Vercel desde GitHub (ADR 0003); la URL a compartir es la del index de `act2`.
- Tests con Playwright y `node:test` en `tests/` (decisión del usuario, 2026-10-08).

## Historial
| Fecha | Cambio | Motivo |
|---|---|---|
| 2026-10-08 | Creada por /specify | Práctica "Aplicación Web One Page" |
| 2026-10-08 | Aprobada por el usuario | /specify Paso 8 |
| 2026-10-08 | Decisión A10 registrada (sin cambio de criterios) | /analyze A10 |
| 2026-10-09 | `--edit`: sección Diseño enlaza el sistema aprobado (sin cambio de criterios) | Sistema de diseño aprobado tras `/init --redo-options` |
| 2026-10-09 | Re-aprobada por el usuario | /specify --edit |
| 2026-10-09 | `--edit`: tres requisitos no funcionales del sistema de diseño (sin cambio de criterios) | /analyze A35 (decisión del usuario, 2026-10-09) |
| 2026-10-09 | `implemented`: CA1–CA18 con sus tests en verde (`npm test --prefix tests`) | /implement T092 |
| 2026-10-09 | Vuelve a `approved`: /review ronda 1 con `changes_requested` (T032–T036) | /review R1–R7 |
| 2026-10-09 | `implemented` tras las tareas de /review (T032–T036) | /implement |
