---
id: 0003
status: accepted
date: 2026-10-08
---

# ADR 0003 · Publicar en Vercel desde GitHub

## Contexto
La práctica exige que el sitio corra en un servidor con HTTPS dentro de la carpeta `act2` y que el
jefe de equipo comparta la URL del index.

## Decisión
El repositorio se aloja en GitHub y se importa en Vercel como proyecto estático (preset *Other*, sin
comando de build, directorio de salida la raíz). Push a `main` → producción; ramas y PR → Preview.
URL de entrega: `https://<proyecto>.vercel.app/act2/` (decisión del usuario, 2026-10-08).

## Alternativas consideradas
- GitHub Pages — también válido; el usuario eligió Vercel.
- Servidor propio por FTP — requiere certificado y despliegue manual.

## Consecuencias
- HTTPS y Preview por rama sin configuración.
- Rollback inmediato desde el panel de Vercel (Instant Rollback).
- La raíz del repo no debe tener `package.json` (Vercel intentaría instalar y construir); las
  herramientas de prueba viven en `tests/` con su propio `package.json`.
