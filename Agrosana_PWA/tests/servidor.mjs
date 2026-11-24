// Servidor estático mínimo para las pruebas: sirve la raíz del repositorio en el puerto 4173.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUERTO = Number(process.env.PUERTO || 4173);
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp',
  '.ico': 'image/x-icon', '.json': 'application/json',
};

http.createServer((pet, res) => {
  if (pet.method !== 'GET' && pet.method !== 'HEAD') { res.writeHead(405).end(); return; }
  if (pet.url === '/__salud') { res.writeHead(200).end('ok'); return; }
  let ruta = decodeURIComponent(new URL(pet.url, 'http://localhost').pathname);
  if (ruta.endsWith('/')) ruta += 'index.html';
  const archivo = path.join(RAIZ, path.normalize(ruta));
  if (!archivo.startsWith(RAIZ + path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(archivo, (err, datos) => {
    if (err) { res.writeHead(404, { 'content-type': 'text/plain' }).end('No encontrado'); return; }
    res.writeHead(200, { 'content-type': TIPOS[path.extname(archivo).toLowerCase()] || 'application/octet-stream' });
    res.end(pet.method === 'HEAD' ? undefined : datos);
  });
}).listen(PUERTO, () => process.stdout.write(`Sirviendo ${RAIZ} en http://localhost:${PUERTO}/\n`));
