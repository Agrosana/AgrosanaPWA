---
status: inferred
updated: 2026-10-08
---

# Seguridad de AgroSana

## Referencias
- OWASP Top 10: edición 2025 (la vigente al inicializar; actualizar al cambiar de edición)
- Nivel ASVS objetivo: no aplica (sin backend propio)
- Adicionales: ninguno
- Compliance: ninguno

## Clasificación de datos
| Dato | Clasificación | Dónde vive | Protección |
|---|---|---|---|
| Catálogo, datos de contacto de la empresa | pública | HTML | ninguna necesaria |
| Lo que un visitante escriba en un formulario | no se recoge | solo en el navegador, se descarta | ningún formulario transmite datos (P9) (confirmado por el usuario, 2026-10-08) |

## Autenticación y autorización
- Mecanismo de autenticación: ninguno (sin usuarios).
- Modelo de autorización: todo el contenido es público.
- Dónde se aplica: no aplica.

## Superficie de ataque
| Punto de entrada | Tipo | Autenticado | Notas |
|---|---|---|---|
| Páginas HTML estáticas | HTTPS público (Vercel) | no | solo lectura |
| Formularios | entrada local en el navegador | no | no se envían; el JS no inserta HTML (P9) |
| Recursos de CDN (Font Awesome) | dependencia externa | — | con `integrity` (SRI) y `crossorigin` (P4) |

## Manejo de secretos
- Dónde se guardan: no hay secretos.
- Rotación: no aplica.

## Herramientas
| Tipo | Herramienta | Comando | Estado | Cuándo corre |
|---|---|---|---|---|
| Secretos | gitleaks 8.28.0 | `gitleaks detect --no-banner --redact` | instalada | /implement, /review |
| SAST | regla propia de sinks (node:test) | `node --test tests/unit/estructura.test.mjs` | instalada | /implement, /review |
| SCA (dependencias) | npm audit | `npm audit --audit-level=high --prefix tests` | instalada | /plan, /review, /release |
| Contenedores / IaC | — | — | no-aplica | sin contenedores ni IaC |
| DAST | — | — | no-aplica | sitio estático sin servidor de aplicación ni entradas procesadas |

Ninguna herramienta envía código ni metadatos a un servicio externo.

## Permisos del agente
Reglas base en `shared/agent-security.md` del plugin. Específicas de este proyecto:
- Antigüedad mínima de paquetes nuevos: 7 días
- Rutas protegidas adicionales: ninguna
- Servicios externos aprobados para enviar código o datos: ninguno
- Dominios de red que el agente necesita: registry.npmjs.org, cdnjs.cloudflare.com

## Excepciones aceptadas
| ID | Hallazgo | Severidad | Motivo | Aprobado por | Vence |
|---|---|---|---|---|---|

## Riesgos conocidos
### RS1 · Baja — Formulario legado que pide datos personales sin aviso (A06 Insecure Design)
`contacto.html` pide nombre, correo y teléfono pero los descarta al recargar, sin decírselo al visitante; puede creer que su mensaje se envió.

Correcciones:
- RS1.a Los formularios nuevos dicen explícitamente que no se envían datos o no piden datos personales — estado: en curso (spec 003)
- RS1.b Corregir o retirar el formulario de `contacto.html` — estado: pendiente → roadmap objetivo 3

### RS2 · Baja — Dependencias de CDN sin verificación de integridad (A08 Software and Data Integrity Failures)
Las páginas nuevas cargarán Font Awesome desde un CDN; sin SRI, un CDN comprometido podría inyectar código.

Correcciones:
- RS2.a Todo recurso de CDN lleva `integrity` y `crossorigin="anonymous"` (P4) — estado: en curso (spec 003)
