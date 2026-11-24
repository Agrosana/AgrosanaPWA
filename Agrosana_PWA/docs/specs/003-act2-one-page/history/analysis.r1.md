---
result: fail
round: 1
mode: full
constitution_version: 1.0.0
date: 2026-10-08
spec_sha: d98aa91f7c65
plan_sha: 5f026a934404
tasks_sha: 4286fc8bf0ba
---

# Análisis · 003 Actividad 2: aplicación web One Page de AgroSana

## Resumen
`fail`: dos hallazgos ALTOS que el usuario decide corregir (dependencias de test en T003/T020 y
gitleaks sin tarea), más diez MEDIOS y tres BAJOS de corrección localizada. Ningún CRÍTICO.
Análisis hecho por un subagente de contexto limpio; cada hallazgo se verificó abriendo el archivo citado.
Conteo: CRÍTICA 0 · ALTA 2 · MEDIA 10 · BAJA 3

## Cobertura
| Métrica | Valor |
|---|---|
| Criterios con tarea de test e implementación | 18 / 18 |
| Amenazas con control y test | 3 / 3 |
| Principios de la constitución evaluados | 11 / 11 |

## Seguimiento de rondas anteriores
| ID | Severidad | Estado | Evidencia |
|---|---|---|---|

## Hallazgos nuevos
| ID | Categoría | Severidad | Ubicación | Hallazgo | Corrección |
|---|---|---|---|---|---|
| A1 | Constitución | ALTA | tasks.md T003, T020 | Cubren CA8 y CA2/CA5 sin depender de los tests de esos criterios (T013, T011): incumple P2 | `/tasks 003 --fix A1`: toda tarea con `cubre:` depende de la tarea de test de esos CA |
| A2 | Constitución | ALTA | tasks.md Constitution Check P9; T020–T026 | gitleaks declarado en cada tarea de implementación pero ausente de los "hecho cuando" | `/tasks 003 --fix A2`: `gitleaks detect --no-banner --redact` sin hallazgos en el "hecho cuando" de T020–T026 |
| A3 | Cobertura | MEDIA | spec CA18; T011 | E1 solo vigila la consola en la carga, no durante las interacciones | `/tasks 003 --fix A3`: E4, E9, E10, E11 fallan ante `console.error` o `pageerror` |
| A4 | Cobertura | MEDIA | P6; CA4; T012 | El menú desplegable no se prueba en el corte de 768 px | `/tasks 003 --fix A4`: E4 en 360 y 768 px; menú visible en 1440 |
| A5 | Inconsistencia | MEDIA | plan Contratos; T023, T024 | Cierre del menú con `Esc` y categoría desconocida añadidos sin test | `/plan 003 --fix A5` + `/tasks 003 --fix A5`: se mantienen y E4/E9 los prueban |
| A6 | Inconsistencia | MEDIA | deployment.md; plan; T095; T001, T002 | Tres comandos de smoke distintos y sin modo `BASE_URL` sin servidor local ni intercepción | `/plan 003 --fix A6` + `/tasks 003 --fix A6`: un comando único; T001/T002 soportan `BASE_URL`; T091 actualiza deployment.md |
| A7 | Cobertura de riesgos | MEDIA | security/observability/deployment; T090–T091 | Ninguna tarea actualiza el estado de RS1.a, RS2.a, OB1.a, RD1.a; T090/T091 condicionales | `/tasks 003 --fix A7`: T090/T091 incondicionales con la lista de cambios; el estado "mitigada" lo pone `/release` |
| A8 | Seguridad | MEDIA | ADR 0005; T001 | Versiones verificadas pero sin exigir versiones exactas ni lockfile | `/tasks 003 --fix A8`: versiones exactas y `tests/package-lock.json` versionado; `npm audit` sin altas |
| A9 | Constitución | MEDIA | P4; security.md Herramientas | gitleaks sin ADR | ADR 0006 que registra gitleaks como herramienta del flujo (fuera de `tests/`) |
| A10 | Ambigüedad | MEDIA | spec Decisiones (datos de contacto) | Teléfono y correo probablemente ficticios con enlace marcable | Decisión del usuario (2026-10-08): se usan y la página los marca como datos de ejemplo; E12 comprueba el aviso |
| A11 | Ambigüedad | MEDIA | spec RNF; T017 | No se define qué controles deben medir ≥ 44×44 px | `/plan 003 --fix A11`: lista de controles y exclusiones; E18 recorre esa lista |
| A12 | Ambigüedad | MEDIA | T021 | "Solo fallan aserciones que dependen de CSS o JS" no es verificable | `/tasks 003 --fix A12`: nombrar los tests que deben pasar |
| A13 | Inconsistencia | BAJA | plan Constitution Check P2 | Rango T010–T019 frente a T010–T017 | `/plan 003 --fix A13` |
| A14 | Inconsistencia | BAJA | plan Contratos / Trazabilidad CA2 | "fijo" frente a `sticky` | `/plan 003 --fix A14`: un solo término; E2 en los tres anchos |
| A15 | Cobertura | BAJA | CA15; T015 | E15 no mide la rejilla de Nosotros | `/tasks 003 --fix A15`: E15 incluye `#nosotros` |

## Decisiones pendientes del usuario
- A10: resuelta el 2026-10-08 — usar los datos y marcarlos como de ejemplo (decisión del usuario).

## Aceptados
