---
version: 1.1.0
ratified: 2026-10-08
last_amended: 2026-10-09
status: approved   # aprobada por el usuario el 2026-10-08
---

# Constitución de AgroSana

Principios innegociables. Toda spec, plan y tarea debe cumplirlos. `/plan` y `/tasks` incluyen un
**Constitution Check** que evalúa cada principio; un incumplimiento sin justificación bloquea.

## Código previo
El código existente anterior a esta constitución (carpeta `antiguo/`: `index.html`,
`contacto.html`, `productos.html`, `style.css`, `app.js`) que no cumple un principio **no bloquea**
por sí mismo: queda registrado como deuda en [roadmap.md](roadmap.md) y en las "Observaciones" de
cada spec. Los principios se exigen a todo código **nuevo o modificado**.

## Principios

### P1. Ninguna implementación sin spec aprobada
**Regla:** no se escribe ni modifica código de una entrega sin una spec `approved` en `docs/specs/`.
**Cómo se verifica:** revisión en `/review` (cada archivo cambiado tiene tarea en `tasks.md`; `aidd.py review-pack` → `scope.md`).
**Por qué:** la práctica se evalúa contra requisitos concretos; trabajar sin spec deja requisitos sin cubrir.

### P2. Todo comportamiento nuevo lleva test que falla antes y pasa después
**Regla:** cada requisito de una spec tiene un test automático (estructura con `node --test` o
navegador con Playwright) escrito antes del código que lo cumple, salvo los que solo se pueden
verificar a mano, que llevan `verificación manual:`.
**Cómo se verifica:** `npm test --prefix tests` en verde; `/implement` anota que el test falló antes.
**Por qué:** los 17 requisitos se comprueban de forma repetible antes de cada entrega.

### P3. Cada actividad vive en su carpeta con la estructura mínima
**Regla:** una actividad `actN/` contiene `index.html`, `css/estilos.css`, `js/app.js` e `img/`;
todas sus rutas son relativas y no requiere paso de build.
**Cómo se verifica:** test de estructura (`tests/unit`).
**Por qué:** es el formato de entrega exigido y permite servir la carpeta tal cual en cualquier servidor HTTPS.

### P4. Sin dependencias de ejecución salvo las registradas en un ADR
**Regla:** las páginas solo cargan recursos externos de la lista aprobada en un ADR (hoy: Font
Awesome desde cdnjs, con `integrity` y `crossorigin`). Las herramientas de desarrollo viven solo
en `tests/` y cada una tiene ADR.
**Cómo se verifica:** test que lista los `src`/`href` externos de `actN/index.html` y falla si alguno no está aprobado o no lleva `integrity`.
**Por qué:** controla la cadena de suministro y mantiene el sitio como HTML/CSS/JS puros.

### P5. Iconos solo con Font Awesome; nunca emojis
**Regla:** ningún carácter emoji en HTML, CSS o JS de una actividad; todo icono es un elemento de Font Awesome.
**Cómo se verifica:** test que busca caracteres de los rangos Unicode de emoji y exige al menos un icono `fa-`.
**Por qué:** requisito explícito de la práctica y presentación consistente entre dispositivos.

### P6. Diseño responsivo en teléfono, tableta y computadora
**Regla:** sin desplazamiento horizontal y con navegación utilizable a 360, 768 y 1440 px de ancho.
**Cómo se verifica:** test de Playwright que compara `scrollWidth` con el ancho de la ventana en los tres anchos y abre el menú en 360 px; capturas para `verificación manual:`.
**Por qué:** requisito de la práctica; la mayoría de los clientes del sector consulta desde el teléfono.

### P7. Accesibilidad básica WCAG 2.1 AA
**Regla:** toda imagen de contenido tiene `alt` descriptivo (las decorativas `alt=""` o `aria-hidden`);
el texto tiene contraste ≥ 4.5:1 (≥ 3:1 si es grande); todo control es operable con teclado y con
foco visible; un diálogo se cierra con `Esc` y devuelve el foco a quien lo abrió; objetivos de toque ≥ 44 px.
**Cómo se verifica:** tests de Playwright (alt, contraste calculado, teclado, foco, tamaño de objetivos).
**Por qué:** el sitio debe poder usarlo cualquier persona, incluida la que navega con teclado o lector de pantalla.

### P8. Sin PWA en la Actividad 2
**Regla:** `act2/` no incluye `manifest.json`, Service Worker, almacenamiento en caché ni funcionamiento offline.
**Cómo se verifica:** test de estructura (no existen esos archivos ni registros de `serviceWorker`).
**Por qué:** restricción explícita de la práctica; se desarrollan en una actividad posterior.

### P9. Sin secretos ni sinks peligrosos
**Regla:** ningún secreto en el repositorio; el JavaScript no usa `innerHTML`, `outerHTML`,
`insertAdjacentHTML`, `document.write`, `eval` ni `new Function`, y ningún formulario envía datos a terceros.
**Cómo se verifica:** `gitleaks detect --no-banner --redact` y test `tests/unit` que busca esos sinks y `action` externos.
**Por qué:** un sitio estático sigue siendo vulnerable a XSS y a fugas si se descuida.

### P10. Sin errores en consola ni recursos rotos
**Regla:** al cargar una actividad no hay errores en la consola del navegador ni respuestas 4xx/5xx de recursos propios.
**Cómo se verifica:** test de Playwright que escucha `console` y `response`.
**Por qué:** el sitio actual tiene hojas de estilo e imágenes que no existen; no debe repetirse.

### P11. Ningún deploy a producción sin aprobación humana explícita
**Regla:** solo el usuario publica en producción (push o merge a `main`, que dispara Vercel), después de la puerta de `/release`.
**Cómo se verifica:** manual: registro de aprobación bajo T096 en `tasks.md`.
**Por qué:** producción es la URL que se entrega al profesor.

### P12. La interfaz usa solo el sistema de diseño
**Regla:** colores, tipografía, espaciados, radios, sombras y duraciones salen de los tokens de
[docs/design/system.md](design/system.md); ningún valor literal en estilos o componentes. Un valor
nuevo se añade primero al sistema.
**Cómo se verifica:** test de estructura que falla si `actN/css/*.css` usa colores, tamaños o espaciados literales fuera del bloque de tokens (`:root`).
**Por qué:** mantiene la coherencia entre specs sin revisar cada pantalla a mano; los valores por
defecto de plantillas y librerías lo rompen sin que nadie lo vea.

## Restricciones
- HTML, CSS y JavaScript sin frameworks ni build (Unidad 1).
- Publicación en un servidor con HTTPS (Vercel), dentro de la carpeta `act2/`.
- Sin datos personales: el sitio no recoge ni transmite información de visitantes.

## Definición de terminado
- [ ] `npm test --prefix tests` pasa (estructura y navegador).
- [ ] `python .ai/bin/aidd.py validate` sin errores.
- [ ] Verificación manual en 360, 768 y 1440 px confirmada por el usuario.
- [ ] `/review` con veredicto `approved` y revisión humana registrada.

## Gobierno
- Cambiar esta constitución requiere subir `version` (SemVer: MAJOR elimina o redefine un
  principio, MINOR añade uno, PATCH aclara redacción) y registrar la enmienda abajo.
- Ante conflicto, la constitución prevalece sobre specs, planes y `AGENTS.md`.

## Enmiendas
| Versión | Fecha | Cambio | Motivo |
|---|---|---|---|
| 1.0.0 | 2026-10-08 | Versión inicial | /init |
| 1.1.0 | 2026-10-09 | Añade P12 "La interfaz usa solo el sistema de diseño" | Sistema de diseño aprobado (`design.md` §2.5.4); aprobado por el usuario |
