---
id: 002
slug: pagina-contacto
status: inferred
confidence: alta
created: 2026-10-08
extends: []
---

# 002 · Página de contacto (página legado)

## Problema
Los clientes necesitan saber cómo comunicarse con AgroSana (teléfono, correo y ubicación) y dejar un mensaje.

## Historias de usuario
- Como cliente, quiero ver los datos de contacto de AgroSana para llamar o escribir.
- Como cliente, quiero escribir un mensaje en un formulario para hacer una consulta.

## Criterios de aceptación
<!-- Spec inferida: [x] = cubierto por un test existente; [ ] = comportamiento observado en el código, sin test. -->
- [ ] CA1 · Dado que abro `contacto.html`, cuando carga, entonces veo un menú con enlaces a Inicio, Productos y Contacto.
- [ ] CA2 · Dado que abro `contacto.html`, cuando carga, entonces veo un formulario con nombre completo, correo, teléfono, mensaje y un botón "Enviar".
- [ ] CA3 · Dado que abro `contacto.html`, cuando carga, entonces veo Teléfono 755 000 0000, Correo contacto@agrosana.com y Ubicación Zihuatanejo, Guerrero.
- [ ] CA4 · Dado el formulario, cuando pulso "Enviar", entonces la página se recarga y no se transmite ningún dato (los campos no tienen `name` y el formulario no tiene `action`).
- [ ] CA5 (abuso) · Como visitante malintencionado, intento inyectar HTML en el formulario → no tiene efecto porque nada se procesa ni se muestra.

## Fuera de alcance
- Envío real del mensaje, validación de campos y confirmación al usuario.

## Seguridad y privacidad
- Datos sensibles involucrados: ninguno se transmite; los campos piden datos personales pero se descartan al recargar.
- Quién puede hacer qué: cualquier visitante.
- Casos de abuso:
  - Como visitante malintencionado, intento inyectar HTML en el formulario → no se procesa (CA5).

## Requisitos no funcionales
- Ninguno declarado.

## Preguntas abiertas

## Decisiones
| Fecha | Tipo | Pregunta / conflicto | Decisión | Fuente |
|---|---|---|---|---|
| 2026-10-08 | implícita | ¿El formulario envía datos? | No; el sitio no recoge datos | `docs/security.md` → Clasificación de datos |

## Notas para /plan
- Página legado; las mejoras van en specs nuevas con `extends: [002]`.

## Evidencia (solo si status=inferred)
- Archivos: `antiguo/contacto.html`
- Tests: sin tests

## Observaciones (solo si status=inferred)
- Enlaza `css/estilos.css` y `js/app.js`, que no existen: la página se ve sin estilos y sin script.
- El enlace "Productos" lleva a `productos.html`, que está vacío (0 bytes).
- Los campos no tienen `<label>`; solo `placeholder` (incumple P7 para código nuevo).
- El teléfono 755 000 0000 parece un valor de ejemplo.

## Historial
| Fecha | Cambio | Motivo |
|---|---|---|
| 2026-10-08 | Creada por /init | Documentar código existente |
