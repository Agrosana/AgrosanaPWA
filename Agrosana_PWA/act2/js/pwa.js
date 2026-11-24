/* Registro del Service Worker de AgroSana */
'use strict';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js', { scope: './' })
            .catch(() => {
                // La PWA sigue funcionando en línea aunque el registro falle.
            });
    });
}
