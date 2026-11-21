import http from 'node:http';
import { readFile } from 'node:fs/promises';
const html = await readFile(new URL('./dist/index.html', import.meta.url));
http.createServer((request, response) => {
  if (request.url !== '/' && request.url !== '/index.html') {
    response.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
    response.end('Pagina niet gevonden');
    return;
  }
  response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  response.end(html);
}).listen(4173, '127.0.0.1', () => console.log('Appsive preview: http://localhost:4173'));
