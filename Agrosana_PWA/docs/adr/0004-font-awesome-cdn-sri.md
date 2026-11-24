---
id: 0004
status: accepted
date: 2026-10-08
---

# ADR 0004 · Font Awesome 6.7.2 desde cdnjs con SRI

## Contexto
La práctica exige Font Awesome para los iconos (sin emojis) y la constitución (P4) solo permite
recursos externos registrados en un ADR y con verificación de integridad.

## Decisión
`act2/index.html` carga `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css`
con `integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="`,
`crossorigin="anonymous"` y `referrerpolicy="no-referrer"`. Es el único recurso externo aprobado.

Verificación (`shared/agent-security.md` §2): `@fortawesome/fontawesome-free@6.7.2`, publicado el
2024-12-16, licencias CC-BY-4.0 (iconos), OFL-1.1 (fuentes) y MIT (código); la huella se calculó
sobre `css/all.min.css` del paquete npm y coincide con la publicada por cdnjs.

## Alternativas consideradas
- Copiar Font Awesome dentro de `act2/` — añade carpetas fuera de la estructura mínima y ~1 MB.
- Kit de fontawesome.com — requiere cuenta y ejecuta un script de terceros.

## Consecuencias
- Si el CDN no responde, los iconos no se ven; el texto sigue siendo legible.
- Cambiar de versión exige recalcular la huella y actualizar este ADR.
