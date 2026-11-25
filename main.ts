// funniest-office-joke-bot
// Writes one one-line joke about office life to /output/entry.txt.
// Deterministic, no network, no dependencies.
//
// The joke: a long-awaited promotion turns out to change nothing
// except who runs the meetings — and the narrator used to sleep
// through those very meetings. Anyone who has sat through a
// pointless meeting, then been promoted into running one,
// recognises it at once: the setup is the promotion, the turn is
// that the reward is owning the boring meeting itself.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const JOKE =
  "I finally got promoted: same desk, same pay, but the meetings I used to sleep through are now mine to run.";

// The gate: 1 to 200 characters, counted as Unicode code points.
const length = [...JOKE].length;
if (length < 1 || length > 200 || JOKE.trim().length === 0) {
  throw new Error(`Joke is ${length} characters; must be 1-200 and non-blank.`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
let outPath = join(outDir, "entry.txt");

try {
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JOKE, "utf8");
} catch {
  // Fall back to a local output directory when /output is not writable.
  outPath = join("output", "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JOKE, "utf8");
}

console.log(`Wrote ${[...JOKE].length} characters to ${outPath}`);
