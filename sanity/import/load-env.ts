import fs from "node:fs";
import path from "node:path";

// Minimal .env.local loader (tsx doesn't auto-load it). Imported first in run.ts.
const envPath = path.resolve(process.cwd(), ".env.local");
try {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (!m) continue;
    const [, k, raw] = m;
    let v = raw;
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (process.env[k] === undefined) process.env[k] = v;
  }
} catch {
  /* rely on real env */
}
