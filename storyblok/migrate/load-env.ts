/**
 * Minimal .env.local loader for the migration scripts.
 *
 * tsx/Node do not auto-load .env.local the way Next.js does, so this is
 * imported FIRST in run.ts (before ./mapi) to populate process.env. No
 * dependency, no overwrite of already-set real env vars.
 */
import fs from "node:fs";
import path from "node:path";

const envPath = path.resolve(process.cwd(), ".env.local");
try {
  const text = fs.readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (!m) continue; // skip blanks and comments
    const [, key, rawVal] = m;
    let val = rawVal;
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
} catch {
  /* no .env.local — rely on real environment */
}
