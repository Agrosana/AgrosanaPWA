---
id: 0002
status: accepted
date: 2026-10-08
---

# ADR 0002 · Sitio estático HTML/CSS/JS sin framework ni build (registrado a posteriori)

## Contexto
El código existente es HTML, CSS y JavaScript puros, y el curso (Unidad 1) exige esas tecnologías.

## Decisión
Las páginas se escriben a mano en HTML, CSS y JavaScript sin framework, transpilador ni empaquetador;
se sirven tal cual desde cualquier servidor estático.

## Alternativas consideradas
- Framework (React, Vue) o generador (Vite) — fuera del temario y añade un paso de build.

## Consecuencias
- Despliegue trivial (copiar archivos) y sin dependencias de ejecución.
- Sin componentes reutilizables: el HTML repetido se mantiene a mano.
