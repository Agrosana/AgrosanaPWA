// Apoyo de las pruebas de navegador.
// - prepararCdn: sirve cdnjs/font-awesome/6.7.2 desde el paquete npm (mismo archivo, misma huella SRI).
//   Con BASE_URL definida no intercepta: se prueba el CDN real. Con { alterar: true } siempre
//   intercepta y añade una regla al CSS, para comprobar que el navegador lo rechaza.
// - vigilarConsola: reúne errores de consola, excepciones y respuestas >= 400.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const FA = path.dirname(require.resolve('@fortawesome/fontawesome-free/package.json'));
const PREFIJO = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/';

export async function prepararCdn(page, { alterar = false } = {}) {
  if (process.env.BASE_URL && !alterar) return;
  await page.route(`${PREFIJO}**`, (ruta) => {
    const relativo = new URL(ruta.request().url()).pathname.split('/6.7.2/')[1];
    const archivo = path.join(FA, path.normalize(relativo));
    if (!archivo.startsWith(FA + path.sep) || !fs.existsSync(archivo)) {
      return ruta.fulfill({ status: 404, body: '' });
    }
    let cuerpo = fs.readFileSync(archivo);
    if (alterar && archivo.endsWith('.css')) cuerpo = Buffer.concat([cuerpo, Buffer.from('body{display:none}')]);
    const tipo = archivo.endsWith('.css') ? 'text/css' : archivo.endsWith('.woff2') ? 'font/woff2' : 'font/ttf';
    return ruta.fulfill({ status: 200, body: cuerpo, headers: { 'content-type': tipo, 'access-control-allow-origin': '*' } });
  });
}

export function vigilarConsola(page) {
  const problemas = [];
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') problemas.push(`consola ${m.type()}: ${m.text()}`); });
  page.on('pageerror', (e) => problemas.push(`excepción: ${e.message}`));
  page.on('response', (r) => { if (r.status() >= 400) problemas.push(`HTTP ${r.status()}: ${r.url()}`); });
  return problemas;
}
