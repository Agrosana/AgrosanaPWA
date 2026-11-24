# AgroSana

Sitio web de AgroSana, planta agroquímica de Zihuatanejo, Guerrero: catálogo de productos
(fungicidas, fertilizantes, coadyuvantes) e información de contacto para agricultores de la región.
Proyecto escolar en etapa de prototipo; cada actividad del curso se entrega en su carpeta (`act2/`…).

> Antes de cualquier cambio lee [docs/constitution.md](docs/constitution.md). Si algo aquí
> contradice la constitución, prevalece la constitución.

## Stack
HTML, CSS y JavaScript sin framework ni build; Font Awesome por CDN; pruebas con Node (`node:test`)
y Playwright en `tests/` · tipo: `frontend`

## Comandos
```bash
npm install --prefix tests        # instalar herramientas de prueba (solo tests/)
python -m http.server 8080        # desarrollo local → http://localhost:8080/act2/
npm test --prefix tests           # tests (estructura + navegador)
npm run lint --prefix tests       # lint: reglas de estructura, sinks y emojis (node --test tests/unit/estructura.test.mjs)
# build: no aplica (sitio estático)
```

## Flujo de trabajo
1. `/specify` → spec en `docs/specs/NNN-<slug>/spec.md`
2. `/plan` → `plan.md` con Constitution Check
3. `/tasks` → `tasks.md`
4. `/analyze` → verificación independiente de consistencia → `analysis.md`
5. `/implement` → solo tareas aprobadas, una a la vez, con tests
6. `/review` → contra spec, plan y constitución → `review.md`
7. `/release` → versión, changelog, staging y, con tu aprobación, producción

Usa `/clarify` para cerrar ambigüedades de una spec antes de aprobarla. Estado de todas las specs:
`python .ai/bin/aidd.py status`.

No implementes sin spec aprobada. No hagas commit sin que pasen `npm test --prefix tests` y `npm run lint --prefix tests`.
Nunca despliegues a producción sin aprobación explícita; sigue [docs/deployment.md](docs/deployment.md).
Nunca escribas secretos en el código, los logs ni los docs.

## Reglas y estilo
- Nombres de clases, ids y funciones en español y kebab-case (CSS) / camelCase (JS), como el código existente.
- Rutas siempre relativas dentro de cada actividad; sin `console.log` de depuración.
- Commits: Conventional Commits en español; en `/implement`, `<tipo>(NNN): T0xx <qué>` con `Cubre: CA…` y la ruta de `tasks.md` en el cuerpo. **Sin** línea `Co-Authored-By` (decisión del usuario, 2026-10-08).
- Un commit por tarea durante `/implement` (decisión del usuario, 2026-10-08).
- La documentación del flujo (`.ai/`, `docs/`, `AGENTS.md`, `CLAUDE.md`, `CHANGELOG.md`) está en `.gitignore` y no se versiona (decisión del usuario, 2026-10-08).
- Revisión de diseño: plugin `design` de Anthropic habilitado (`design:design-critique`, `design:accessibility-review`, `design:design-system`, `design:ux-copy`) (decisión del usuario, 2026-10-08).

## Mapa del repositorio
| Ruta | Contenido |
|---|---|
| `antiguo/` | Prototipo legado: `index.html`, `contacto.html`, `productos.html`, `style.css`, `app.js`, `img/` (specs 001 y 002) — movido de la raíz (decisión del usuario, 2026-10-08) |
| `act2/` | Actividad 2: aplicación One Page |
| `tests/` | Pruebas (Node y Playwright) con su propio `package.json` |
| `docs/` | Documentación del flujo (no versionada) |
| `.ai/` | Configuración y validador del flujo (no versionado) |

## Documentación
- [Constitución](docs/constitution.md) — principios innegociables
- [Sistema de diseño](docs/design/system.md) — tokens y componentes; vista en [system.html](docs/design/system.html)
- [Arquitectura](docs/architecture.md)
- [Despliegue](docs/deployment.md) — entornos, deploy y rollback
- [Seguridad](docs/security.md) — datos sensibles, auth, herramientas y excepciones
- [Observabilidad](docs/observability.md) — logs, correlación, auditoría, métricas y alertas
- [Roadmap](docs/roadmap.md) — etapa actual y objetivos
- [Specs](docs/specs/README.md)
- [ADRs](docs/adr/)
- [Plantillas](docs/templates/)
