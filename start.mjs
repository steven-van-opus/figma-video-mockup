// One-command local dev: builds, serves the site on :4321, and runs the export server on :5050.
// Node-only (no python3 needed) — `npm start`.
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync, spawn } from "child_process";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = +(process.env.SITE_PORT || 4321);

execFileSync("node", [path.join(ROOT, "build.mjs")], { stdio: "inherit" });

const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "application/javascript", ".mjs": "application/javascript",
  ".css": "text/css", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".gif": "image/gif", ".svg": "image/svg+xml", ".webp": "image/webp",
  ".ico": "image/x-icon", ".mp4": "video/mp4", ".webm": "video/webm", ".woff": "font/woff", ".woff2": "font/woff2",
};

http.createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = path.normalize(path.join(ROOT, url));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end("not found"); }
    res.writeHead(200, { "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream" });
    res.end(data);
  });
}).listen(PORT, () => console.log(`site on http://localhost:${PORT}/dashboard.html`));

const exp = spawn("node", [path.join(ROOT, "export-server.mjs")], { stdio: "inherit" });
process.on("SIGINT", () => { exp.kill(); process.exit(0); });
