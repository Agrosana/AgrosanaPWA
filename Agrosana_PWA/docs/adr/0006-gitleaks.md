---
id: 0006
status: accepted
date: 2026-10-08
---

# ADR 0006 · gitleaks como escáner de secretos del flujo

## Contexto
La constitución (P9) prohíbe secretos en el repositorio y P4 exige registrar las herramientas de
desarrollo (/analyze A9).

## Decisión
Se usa `gitleaks detect --no-banner --redact` (v8.28.0, MIT, binario oficial de
github.com/gitleaks/gitleaks) en `/implement`, `/review` y antes de cada push. No vive en `tests/`
ni se instala en el proyecto: es una herramienta del entorno de quien ejecuta el flujo.

## Alternativas consideradas
- `git-secrets` — reglas más limitadas.
- Revisión manual — no repetible.

## Consecuencias
- Quien ejecute el flujo necesita el binario de gitleaks en su equipo.
