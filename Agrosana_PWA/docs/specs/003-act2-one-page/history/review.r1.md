---
spec: 003-act2-one-page
verdict: changes_requested
round: 1
date: 2026-10-09
base: 95afe92
head: 87daefb
human_signoff: pending
---

# Review · 003 Actividad 2: aplicación web One Page de AgroSana

## Resumen
`changes_requested`. El anillo de foco del teclado no se ve en los enlaces del pie ni en la franja
de categorías (WCAG 2.4.7 y 1.4.11, constitución P7), y el test de foco no lo detectaba.

La revisión la hicieron cuatro subagentes de contexto limpio (Spec; Constitución y Calidad;
Seguridad; Accesibilidad con la lista de `design:accessibility-review` y `design:design-critique`)
más la verificación automática. Cada hallazgo se verificó en el archivo citado.

El usuario decidió corregir bloqueantes e importantes y llevar los menores al roadmap
(2026-10-09).

Conteo: bloqueante 2 · importante 5 · menor 19

## Verificación automática
| Comando | Resultado |
|---|---|
| `npm test --prefix tests` (dos veces) | ✅ 10 reglas estáticas + 43 casos de navegador; 0 fallos (línea base: 0) |
| `npm run lint --prefix tests` | ✅ 10/10 |
| build | no aplica (sitio estático) |
| `python .ai/bin/aidd.py validate docs/specs/003-act2-one-page` | ✅ 0 errores |

## Criterios de aceptación
| CA | Test | Estado | Nota |
|---|---|---|---|
| CA1 | U1, U5 · E1 | ✅ | |
| CA2 | E2, E15 | ✅ | |
| CA3 | E3 | ✅ | |
| CA4 | E4 | ✅ | El nombre del botón no cambia a "Cerrar menú" (R15, menor) |
| CA5 | E5 | ✅ | |
| CA6 | E6 | ✅ | |
| CA7 | E7 | ✅ | |
| CA8 | E8 | ✅ | |
| CA9 | E9 | ✅ | La franja no aplica el filtro (R7) |
| CA10 | E10 | ✅ | |
| CA11 | E11 | ✅ | |
| CA12 | E12 · U4 | ✅ | |
| CA13 | E13 | ⚠ | Año fijo frente a `getFullYear()`: fallará en 2027 (R5) |
| CA14 | U3 · E14 | ✅ | |
| CA15 | E15 | ✅ | |
| CA16 | E16 · U4 | ✅ | |
| CA17 | E17 · U2 | ✅ | |
| CA18 | E1, E4, E9–E11 · U4 | ✅ | |

## Conformidad con el plan
- Cambios fuera del plan: ninguno (`scope.md`: 0 archivos sin tarea).
- Partes del plan sin implementar: ninguna. T005 no tiene diff porque solo cambia `docs/`, que no se versiona.

## Constitution Check (sobre el código)
| Principio | Resultado | Evidencia |
|---|---|---|
| P1 | ✅ | Spec, plan y tareas aprobados; todo archivo cambiado tiene tarea |
| P2 | ✅ | Cada tarea de implementación con test previo y nota "falló antes" |
| P3 | ✅ | U1, U5 |
| P4 | ✅ | U2 (Font Awesome con SRI); fuentes propias (ADR 0007); E19 |
| P5 | ✅ | U3, E14 |
| P6 | ✅ | E15 en 360/768/1440 |
| P7 | ❌ | Foco invisible en el pie y en la franja (R1, R2); el test de foco no mide el contraste del anillo (R4) |
| P8 | ✅ | U1 |
| P9 | ✅ | U4; solo `textContent` y atributos |
| P10 | ✅ | E1 y consola vigilada |
| P11 | ✅ | Pendiente de `/release` (T096) |
| P12 | ⚠ | Tamaños de la ventana de detalles hechos con multiplicadores sin token (R6) |

## Seguridad
| Herramienta | Resultado |
|---|---|
| gitleaks (`95afe92..HEAD`) | ✅ 0 hallazgos |
| SAST (`node --test tests/unit/estructura.test.mjs`) | ✅ 10/10 |
| SCA (`npm audit --audit-level=high --prefix tests`) | ✅ crít: 0 · alta: 0 · media: 0 |
| contenedores, DAST | no aplica |

| Tema OWASP (2025) | Resultado | Evidencia |
|---|---|---|
| A01 Control de acceso | ✅ | Sitio público estático, sin rutas sensibles |
| A02 Configuración | ❌ (menor) | Sin CSP ni cabeceras de seguridad (R16) |
| A03 Cadena de suministro | ✅ | Versiones exactas, lockfile con `integrity`, `npm audit` 0, huellas de las fuentes = ADR 0007; registro de ADR 0005 incompleto (R19) |
| A04 Criptografía | ➖ | No se recogen datos |
| A05 Inyección / XSS (TM2) | ✅ | Solo `textContent`; sin leer `location`; E16 en documento nuevo por carga |
| A06 Diseño inseguro (TM3) | ✅ | Sin formularios; `tel:`/`mailto:`; E12, U4 |
| A07 Autenticación | ➖ | No hay usuarios |
| A08 Integridad (TM1) | ✅ | SRI + `crossorigin`; U2 y E17 (no comprueban `referrerpolicy`: R18) |
| A09 Registro | ✅ | Sin `console.*` (U4) |
| A10 Errores | ➖ | Sin servidor; el JS sale si falta un nodo |

## Observabilidad
- Eventos de auditoría de la spec emitidos y probados: no aplica (el plan no define ninguno).
- Datos sensibles en logs del código tocado: ninguno (no hay logs; U4 prohíbe `console.*`).
- `request_id` presente en los logs nuevos: no aplica.

## Hallazgos
| ID | Severidad | Archivo:línea | Hallazgo | Sugerencia |
|---|---|---|---|---|
| R1 | bloqueante | act2/css/estilos.css:168, 549–557 | El anillo de foco de los enlaces del pie (`--color-focus` #111611) cae sobre el fondo del pie, también #111611: contraste 1:1, foco invisible (2.4.7, 1.4.11; P7). | Token de foco para fondos oscuros en el sistema y aplicarlo en el pie |
| R2 | bloqueante | act2/css/estilos.css:327–342 | En la franja, el anillo exterior cae sobre el borde negro o la celda vecina, y frente a los colores de categoría queda en ≈ 2.7:1, por debajo de 3:1. | Anillo interior claro que dé ≥ 3:1 con los cuatro colores |
| R3 | importante | act2/css/estilos.css:414–433 | En el filtro, el anillo se confunde con el marco de 3 px y con el segmento activo. | Anillo interior (claro sobre el segmento activo) |
| R4 | importante | tests/e2e/accesibilidad.spec.mjs:58–75 | E18 (foco) solo pulsa Tab 25 veces, así que no llega a Contacto ni al pie. Además acepta cualquier `outline` de 2 px o cualquier `box-shadow` sin medir su contraste. | Recorrer todos los controles, incluido Cerrar del diálogo, y exigir contraste ≥ 3:1 entre el anillo y el fondo que lo rodea |
| R5 | importante | act2/index.html:241 · tests/e2e/basico.spec.mjs:82 | El pie tiene el año 2026 fijo y E13 lo compara con el año actual: fallará en 2027 sin que cambie el código. | El año del pie es el de la entrega; E13 comprueba un "© AAAA" de cuatro cifras |
| R6 | importante | act2/css/estilos.css:563, 595, 599 | La ventana de detalles usa `calc(var(--size-foto) * 0.6)`, `* 0.7` y `--measure-text + --size-foto`: tamaños sin token (P12). U6 no ve multiplicadores sin unidad. | Tokens en el sistema y una regla de U6 que detecte multiplicadores decimales en `calc()` |
| R7 | importante | act2/index.html:69–72 · act2/js/app.js | Los enlaces de la franja llevan a Productos sin aplicar su categoría: el enlace promete un filtro que no ocurre. | Al pulsar, aplicar el filtro de su `data-categoria` sin leer la URL (decisión del usuario, 2026-10-09) |
| R8 | menor | tests/e2e/sistema.spec.mjs:50–62 | E20 no comprueba que la franja sea el único momento animado. | Comprobar `document.getAnimations()` tras cargar |
| R9 | menor | act2/css/estilos.css:212, 340 | El hover anima `filter`, y `system.md` → Movimiento limita las animaciones a `transform`, `opacity` y `clip-path`. | Aclarar la excepción en el sistema o quitar la transición |
| R10 | menor | act2/js/app.js:105–107 | Seleccionar texto en la ventana y soltar sobre el fondo la cierra. | Cerrar solo si el `pointerdown` y el `click` son en el fondo |
| R11 | menor | act2/js/app.js:10 | El menú puede verse desplegado un instante en el teléfono antes de que el script añada `js`. | Documentarlo o añadir la clase antes |
| R12 | menor | tests/servidor.mjs:9–13, 28 | Al servidor de pruebas le falta el tipo `.woff2`, escucha en todas las interfaces y sirve también `.git/`. | `font/woff2`, `127.0.0.1` y 403 para las rutas que empiezan por `/.` |
| R13 | menor | act2/css/estilos.css:230, 613 | El encabezado mide 106 px en teléfono y 82 px en escritorio, más que el `scroll-padding-top` de 80 px. | `row-gap: 0` y ajustar el relleno |
| R14 | menor | act2/css/estilos.css:379–389, 646, 657 | `--text-label-m` se aplica en cortes distintos en la barra, la franja y la advertencia. | Unificar el corte |
| R15 | menor | act2/js/app.js:20–25 | El botón de menú no cambia su nombre a "Cerrar menú" al abrirse, como pide `system.md` → Handoff. | Alternar `aria-label` y comprobarlo en E4 |
| R16 | menor | act2/index.html (sin `vercel.json`) | Sin CSP ni cabeceras de seguridad (A02). | `vercel.json` con CSP, `nosniff` y `Referrer-Policy` |
| R17 | menor | tests/unit/estructura.test.mjs:73 | U4 solo busca `location`; no busca `document.URL`, `referrer`, `hashchange` ni sinks por propiedad. | Ampliar los patrones con controles positivos |
| R18 | menor | tests/unit/estructura.test.mjs:40–54 | U2 no comprueba `referrerpolicy="no-referrer"`, que forma parte de TM1. | Añadir la aserción |
| R19 | menor | docs/adr/0005-herramientas-de-prueba.md | Faltan repositorio, mantenedores y transitivas (incluido el script opcional de `fsevents`). | Completar el ADR |
| R20 | menor | AGENTS.md (Comandos) | `npm install --prefix tests` va sin `--ignore-scripts`. | Unificar con ADR 0005 |
| R21 | menor | act2/img/logo.svg | El logotipo usa colores que no están en los tokens. | Registrarlos como colores de marca o usar tokens |
| R22 | menor | act2/index.html:22 | El enlace de la marca se anuncia "AgroSana AgroSana El agricultor". | `alt=""` en el logo dentro del enlace |
| R23 | menor | act2/css/estilos.css:421–433 | El filtro no tiene hover. | `brightness(var(--hover-brightness))` |
| R24 | menor | act2/index.html:83 | La barra de precauciones es un `<p>`, aunque funciona como título (1.3.1). | `<h3>` con el mismo estilo |
| R25 | menor | act2/css/estilos.css:611–623 | El menú no marca la sección actual (ya está en el roadmap por A28). | Sin acción nueva |
| R26 | menor | tests/e2e/interaccion.spec.mjs:59 · tests/e2e/basico.spec.mjs:20 · accesibilidad.spec.mjs:82 · estructura.test.mjs:204 | Detalles de los tests: aserción de relleno en E10, E2 duplicado con E15, `a.marca` y `a.saltar` fuera de la lista de toque, U7 sin `docs/` no aparece como omitido. | Limpieza de tests |

## Preparación para release
- Rollback factible: sí. Vercel Instant Rollback más `git revert`; no hay migraciones ni flags.
- Migraciones compatibles con la versión anterior: no aplica.
- Docs actualizadas (architecture, deployment): sí (T090, T091).
- SCA sin críticas ni altas: sí.
- Cobertura de riesgos: RS1.a, RS2.a, OB1.a y RD1.a están "en curso (spec 003)"; RS1.b → roadmap objetivo 3. Ninguno figura como mitigado antes de `/release`.

## Tareas añadidas
- T032 ← R4 (test de foco)
- T033 ← R5, R7 (tests de año y franja)
- T034 ← R1, R2, R3, R6 (sistema 1.2.0: tokens de foco y de la ventana)
- T035 ← R6 (U6 detecta multiplicadores; U7 con los tokens nuevos)
- T036 ← R1, R2, R3, R6, R7 (estilos y script)

## Aceptados sin tarea
- **R8** → roadmap: E20 no comprueba que la franja sea la única animación
- **R9** → roadmap: el hover anima `filter`, fuera de la lista de Movimiento del sistema
- **R10** → roadmap: soltar una selección sobre el fondo cierra la ventana de detalles
- **R11** → roadmap: destello del menú del teléfono antes de que cargue el script
- **R12** → roadmap: servidor de pruebas (`.woff2`, `127.0.0.1`, rutas con punto)
- **R13** → roadmap: altura del encabezado frente a `scroll-padding-top`
- **R14** → roadmap: corte único para `--text-label-m`
- **R15** → roadmap: "Cerrar menú" como nombre del botón abierto
- **R16** → roadmap: CSP y cabeceras de seguridad en `vercel.json`
- **R17** → roadmap: ampliar U4 a más fuentes y sinks
- **R18** → roadmap: U2 comprueba `referrerpolicy`
- **R19** → roadmap: completar el registro de ADR 0005
- **R20** → roadmap: `--ignore-scripts` en el comando de instalación de AGENTS.md
- **R21** → roadmap: colores del logotipo en el sistema
- **R22** → roadmap: nombre duplicado del enlace de la marca
- **R23** → roadmap: hover del filtro
- **R24** → roadmap: barra de precauciones como encabezado
- **R25** → roadmap: sección actual en el menú (ya registrado por A28)
- **R26** → roadmap: limpieza de tests (E10, E2, lista de toque, U7 omitido)
