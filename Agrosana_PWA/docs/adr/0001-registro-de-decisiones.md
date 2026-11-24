---
id: 0001
status: accepted
date: 2026-10-08
---

# ADR 0001 · Registrar decisiones arquitectónicas mediante ADRs

## Contexto
El proyecto empieza a trabajar con el flujo guiado por specs y necesita dejar por escrito por qué
se eligen herramientas y estructuras, para que el equipo y las skills las respeten.

## Decisión
Toda decisión arquitectónica (dependencias, estructura de carpetas, plataforma de despliegue) se
registra como ADR en `docs/adr/NNNN-<slug>.md`.

## Alternativas consideradas
- Notas sueltas en el README — se pierden y no tienen estado.

## Consecuencias
- Más trazabilidad; cada dependencia nueva exige un ADR antes de añadirse.
