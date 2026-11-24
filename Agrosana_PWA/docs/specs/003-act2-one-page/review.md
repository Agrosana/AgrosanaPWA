---
spec: 003-act2-one-page
verdict: approved
round: 3
date: 2026-10-09
base: 95afe92
head: 6d07748
human_signoff: pending
---

# Review · 003 Actividad 2: aplicación web One Page de AgroSana

## Resumen
`approved`. Ronda `--rerun` sobre `9aa164a..6d07748`: un solo cambio, T037, abierto durante el
staging (T095) porque `/act2` sin barra final cargaba la página sin estilos. `vercel.json` con
`"trailingSlash": true` redirige `/act2` → `/act2/`; no cambia código de `act2/`. U8 lo comprueba
y falló antes. No hay hallazgos nuevos; R1–R7 siguen resueltos (ronda 2) y R8–R26 aceptados al
roadmap.

Conteo: bloqueante 0 · importante 0 · menor 0 (nuevos)

## Verificación automática
| Comando | Resultado |
|---|---|
| `npm test --prefix tests` (dos veces) | ✅ 11 reglas estáticas + 46 casos de navegador; 0 fallos |
| `npm run lint --prefix tests` | ✅ 11/11 |
| build | no aplica (sitio estático) |
| `python .ai/bin/aidd.py validate docs/specs/003-act2-one-page` | ✅ 0 errores |

## Hallazgos de la ronda anterior
| ID | Estado | Evidencia |
|---|---|---|
| R1 | ✅ resuelto | `--color-focus-on-dark` (#FFFFFF) en `.pie :focus-visible` (estilos.css:177–182); E18 mide ≥ 3:1 en cada enlace del pie |
| R2 | ✅ resuelto | Anillo interior blanco (`--focus-offset-inset`) en `.franja a:focus-visible`; E18 mide ≥ 3:1 sobre los cuatro colores de categoría |
| R3 | ✅ resuelto | `.filtro:focus-visible` interior; blanco sobre el segmento activo |
| R4 | ✅ resuelto | E18 recorre todos los controles por índice de documento, más Cerrar de la ventana, y exige contraste ≥ 3:1 (T032) |
| R5 | ✅ resuelto | E13 comprueba `© AAAA` de cuatro cifras, sin depender del año actual (T033) |
| R6 | ✅ resuelto | `--size-modal`, `--size-foto-modal`, `--size-foto-modal-alto` en el sistema 1.2.0 y en `:root`; U6 detecta multiplicadores decimales en `calc()` (T035) |
| R7 | ✅ resuelto | Los enlaces de la franja llaman a `aplicar()` con su `data-categoria`, filtrada por la lista `CATEGORIAS`; sin leer la URL; caso nuevo de E9 (T033, T036) |

## Criterios de aceptación
| CA | Test | Estado | Nota |
|---|---|---|---|
| CA1 | U1, U5 · E1 | ✅ | |
| CA2 | E2, E15 | ✅ | |
| CA3 | E3 | ✅ | |
| CA4 | E4 | ✅ | El nombre del botón no cambia a "Cerrar menú" (R15, aceptado al roadmap) |
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
- Partes del plan sin implementar: ninguna.

## Constitution Check (sobre el código)
| Principio | Resultado | Evidencia |
|---|---|---|
| P1 | ✅ | T032–T036 aprobadas; todo archivo cambiado tiene tarea |
| P2 | ✅ | T032, T033 y T035 fallaron antes de T036 |
| P3–P6 | ✅ | U1–U5, E14, E15 sin cambios en 360/768/1440 |
| P7 | ✅ | Foco visible ≥ 3:1 en todos los controles (E18) |
| P8–P10 | ✅ | U1, U4, E1 |
| P11 | ✅ | Pendiente de `/release` (T096) |
| P12 | ✅ | Solo `var()` fuera de `:root`; U6 y U7 con 84 tokens |

## Seguridad
| Herramienta | Resultado |
|---|---|
| gitleaks (`87daefb..HEAD`) | ✅ 0 hallazgos |
| SAST (`node --test tests/unit/estructura.test.mjs`) | ✅ 11/11 |
| SCA (`npm audit --audit-level=high --prefix tests`) | ✅ 0 vulnerabilidades |
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
- Sin cambios: no hay logs ni eventos de auditoría (U4 prohíbe `console.*`).

## Hallazgos
Ninguno nuevo en esta ronda.

## Preparación para release
- Rollback factible: sí. Vercel Instant Rollback más `git revert`; no hay migraciones ni flags.
- Migraciones compatibles con la versión anterior: no aplica.
- Docs actualizadas (architecture, deployment, design/system 1.2.0): sí.
- SCA sin críticas ni altas: sí.
- Cobertura de riesgos: RS1.a, RS2.a, OB1.a y RD1.a "en curso (spec 003)"; `/release` los marca mitigados.

## Tareas añadidas
- T037 ← incidente de staging (`/act2` sin estilos), añadida por `/release`

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
