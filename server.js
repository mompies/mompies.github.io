const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
  const route = req.url === "/" ? "/index.html" : req.url;
  const filePath = path.join(__dirname, route);

  const getContentType = (ext) => {
    if (ext === ".css") return "text/css";
    if (ext === ".html") return "text/html";
    return "application/octet-stream";
  };

  const contentType = getContentType(path.extname(filePath));

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("No se encontró el recurso solicitado");
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log("Presiona Ctrl+C para detener el servidor");
});
