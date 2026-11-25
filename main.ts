import { writeFileSync, chmodSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const line =
  "I asked the AI to write me a pickup line, and it just showed me your picture.";

// The gate requires 1-200 characters of non-whitespace UTF-8 text on one line.
if (line.length < 1 || line.length > 200 || line.trim().length === 0) {
  throw new Error(`line length ${line.length} is outside the 1-200 gate`);
}
if (line.includes("\n")) {
  throw new Error("line must be a single line");
}

mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, line + "\n", "utf8");
chmodSync(entryPath, 0o644);
