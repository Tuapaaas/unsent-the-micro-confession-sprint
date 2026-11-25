// Unsent: The Micro-Confession Sprint — make.fun entry.
// Writes a two-part micro-confession (a To: line plus the unsent line
// itself, exactly as typed) to entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TO_LINE = "To: my brother";
const MESSAGE =
  "I told Mum about the party, not the neighbour. " +
  "I've let you blame him for six years.";

const text = `${TO_LINE}\n${MESSAGE}\n`;

// The sealed gate: entry.txt must be UTF-8 text of 1 to 260 characters,
// not only white space. The message itself is one line of at most 200.
if (text.length < 1 || text.length > 260) {
  throw new Error(`entry is ${text.length} chars; gate is 1-260`);
}
if (MESSAGE.length > 200 || MESSAGE.includes("\n")) {
  throw new Error("message must be a single line of at most 200 chars");
}
if (text.trim().length === 0) {
  throw new Error("entry must not be only white space");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
console.log(`wrote entry.txt (${text.length} chars)`);
