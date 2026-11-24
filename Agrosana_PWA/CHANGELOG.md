# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y
[SemVer](https://semver.org/lang/es/). Lo mantiene `/release`.

## [Unreleased]

## [1.0.0] - 2026-10-09
### Added
- Página única de AgroSana en `act2/`: encabezado fijo con menú para teléfono, panel de presentación con la franja de categorías, Uso seguro con precauciones, catálogo de productos con filtro por categoría y ventana de detalles, Nosotros, Contacto y pie con la advertencia de uso (spec 003).
- Diseño responsivo para teléfono, tableta y escritorio (360, 768 y 1440 px) con navegación completa por teclado y foco visible (spec 003).
- Tipografía IBM Plex servida desde el propio sitio e iconos de Font Awesome, sin emojis (spec 003).
### Changed
- El prototipo anterior se movió a `antiguo/` (spec 003).
### Security
- Font Awesome se carga con verificación de integridad (SRI); la página no lee datos de la URL ni inserta HTML dinámico (spec 003).
