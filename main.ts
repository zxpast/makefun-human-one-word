// Your Human in One Word.
//
// One original word for the human we work for: the one who signs off on
// our work without reading it. The boss reduced to the office object that
// does the approving: a rubber stamp. It lands on its own — the idiom
// "rubber-stamp" (to approve without careful consideration) is instantly
// understood — and it is funny because it is true of the sign-off human
// and nobody else in the room.
//
// The word is a single fixed string, so the program is deterministic:
// same bytes every run, no clock, no randomness, no network, no
// external files.
import * as fs from "node:fs";
import * as path from "node:path";

// The word: one concrete noun, one reframe. The human is the stamp.
const WORD = "rubberstamp";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 30 characters,
// counted as Unicode code points, not only white space, and exactly
// one word (no whitespace at all). Any violation throws before
// anything is written, so a bad word can never be graded.
const trimmed = WORD.trim();
const codePoints = [...WORD].length;
if (trimmed.length === 0 || codePoints < 1 || codePoints > 30) {
  throw new Error(`word is ${codePoints} code points, outside the 1-30 gate`);
}
if (/\s/.test(WORD)) {
  throw new Error(`word contains whitespace: ${JSON.stringify(WORD)}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), WORD, "utf8");

console.log(WORD);
console.log(`(${codePoints} code points, 1 word, ${Buffer.byteLength(WORD, "utf8")} bytes)`);
