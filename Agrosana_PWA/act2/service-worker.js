/* AgroSana PWA: precarga de recursos y soporte sin conexión. */
'use strict';

const CACHE_NAME = 'agrosana-pwa-v1';
const BASE = new URL('./', self.location.href);
const ARCHIVOS = [
    './',
    './index.html',
    './manifest.webmanifest',
    './css/estilos.css',
    './js/app.js',
    './js/pwa.js',
    './img/logo.svg',
    './img/bio-ph.jpg',
    './img/frutime.jpg',
    './img/hydrospeed-cab-max.jpg',
    './img/prozycar.jpg',
    './img/surfatek.jpg',
    './fonts/ibm-plex-sans-latin-400-normal.woff2',
    './fonts/ibm-plex-sans-latin-600-normal.woff2',
    './fonts/ibm-plex-sans-latin-700-normal.woff2',
    './fonts/ibm-plex-sans-condensed-latin-700-normal.woff2'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ARCHIVOS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((nombres) => Promise.all(
                nombres.filter((nombre) => nombre.startsWith('agrosana-pwa-') && nombre !== CACHE_NAME)
                    .map((nombre) => caches.delete(nombre))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const solicitud = event.request;
    if (solicitud.method !== 'GET') return;

    const url = new URL(solicitud.url);
    // No interceptar servicios externos (por ejemplo, Font Awesome CDN).
    if (url.origin !== self.location.origin) return;

    if (solicitud.mode === 'navigate') {
        event.respondWith(
            fetch(solicitud)
                .then((respuesta) => {
                    const copia = respuesta.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', copia));
                    return respuesta;
                })
                .catch(() => caches.match('./index.html'))
        );
        return;
    }

    event.respondWith(
        caches.match(solicitud).then((guardado) => {
            if (guardado) return guardado;
            return fetch(solicitud).then((respuesta) => {
                if (respuesta && respuesta.ok) {
                    const copia = respuesta.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(solicitud, copia));
                }
                return respuesta;
            });
        })
    );
});
