import http from 'node:http';
import { readFile } from 'node:fs/promises';
// Lokale preview: / -> index.html, /apps -> apps.html, /style.css -> style.css
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml' };
http.createServer(async (request, response) => {
  let path = decodeURIComponent(new URL(request.url, 'http://x').pathname).replace(/^\/+/, '');
  if (path === '' ) path = 'index.html';
  if (!/\.[a-z]+$/.test(path)) path += '.html';
  if (path.includes('..')) path = '404';
  try {
    const body = await readFile(new URL('./dist/' + path, import.meta.url));
    response.writeHead(200, { 'Content-Type': types[path.slice(path.lastIndexOf('.'))] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Pagina niet gevonden');
  }
}).listen(4173, '127.0.0.1', () => console.log('Appsive preview: http://localhost:4173'));
