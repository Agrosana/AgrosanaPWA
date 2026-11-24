---
status: inferred
updated: 2026-10-08
---

# Observabilidad y auditoría de AgroSana

Estado de cada capacidad: **presente** (instalada o declarada) · **configurada** (configurada para
este proyecto) · **en uso** (el código o la operación la ejercitan). Solo "en uso" cuenta como
cubierta.

## Resumen
| Capacidad | Herramienta | Estado | Evidencia |
|---|---|---|---|
| Logs de aplicación | `console.log` en `app.js` | presente | `app.js` (no se carga en ninguna página) |
| Agregación de logs | panel de Vercel (peticiones) | presente | ADR 0003; se usará al publicar |
| Correlación por petición | No aplica | — | sin servidor propio |
| Registro de auditoría | No aplica | — | sin usuarios ni datos |
| Métricas | Vercel Analytics | no instalada | — |
| Trazas distribuidas | No aplica | — | — |
| Alertas | ninguna | — | — |

## Logs
- No aplica: sin servidor propio. El único log es la consola del navegador.
- Qué **nunca** se registra en consola: lo que el visitante escriba en formularios.

## Correlación
- No aplica: sitio estático sin servidor de aplicación.

## Registro de auditoría
No aplica: no hay usuarios, cuentas ni datos sensibles (`audit.required: false`).

## Métricas y alertas
| Métrica / alerta | Umbral | Canal |
|---|---|---|
| Despliegue fallido en Vercel | cualquier fallo | correo de Vercel al dueño del proyecto |

## Sin servidor
No hay peticiones propias, correlación ni registro de auditoría central. Lo que sí cuenta:
- Fallos: errores de consola y recursos rotos, que los tests de navegador detectan (P10); fallos de despliegue, que Vercel notifica.
- Herramientas que envían datos fuera del navegador: ninguna.
- Log local (consola): no se escribe nada de lo que el visitante teclee; el código nuevo no deja `console.log` de depuración.

## Brechas
### OB1 · Baja — Script de depuración en el código legado
`app.js` escribe en consola en cada clic de botón; no aporta información útil y se copiaría a código nuevo.
Correcciones:
- OB1.a El JavaScript nuevo no deja `console.log` de depuración (test de estructura) — estado: en curso (spec 003)

## Brechas por confirmar

## No determinado
- Si se activará Vercel Analytics (enviaría datos de visitas a Vercel; requeriría aviso).
