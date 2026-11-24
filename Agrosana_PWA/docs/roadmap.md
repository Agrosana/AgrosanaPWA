---
updated: 2026-10-09
---

# Roadmap

**Etapa actual:** prototype

## Objetivos
| # | Objetivo | Criterio de éxito | Spec | Estado |
|---|---|---|---|---|
| 1 | Entregar la Actividad 2: aplicación One Page de AgroSana | `https://<proyecto>.vercel.app/act2/` responde por HTTPS y cumple los 17 requisitos de la práctica con sus tests en verde. Riesgos: RS1.a, RS2.a, OB1.a, RD1.a; fuera: RS1.b → objetivo 3 | [003](specs/003-act2-one-page/spec.md) | en curso |
| 2 | Convertir act2 en PWA (manifest, Service Worker, offline) | Actividad posterior del curso | — | pendiente |
| 3 | Sanear las páginas legado de `antiguo/` | `index.html` y `contacto.html` sin recursos rotos y con `alt`; formulario corregido o retirado. Riesgos: RS1.b; fuera: RS1.a → objetivo 1 | — | pendiente |

## Próxima etapa
Pasar a `mvp` cuando act2 esté publicada y aprobada por el profesor.

## Pendientes y deuda
- Páginas legado con recursos rotos: `css/estilos.css`, `js/app.js`, `img/producto6.jpg`, `img/producto7.jpg`; `productos.html` vacío (specs 001 y 002, Observaciones).
- `style.css` mezcla la hoja de AgroSana con la de la práctica guiada.
- Marcar la sección actual en el menú (`docs/design/system.md` → Navegación): fuera de la spec 003 (decisión del usuario, 2026-10-09; /analyze A28, A45).
