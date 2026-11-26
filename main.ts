// 214 Unread Notifications, Cleared Before the Funeral — entry program.
//
// Writes one absurd clause, buried-deep-in-the-ToS style, to
// /output/entry.txt. Deterministic, no network, no dependencies,
// no randomness: the program writes one fixed sentence and exits.
//
// The clause:
//
//   Upon the User's death, their account passes to their next of kin,
//   together with 214 unread notifications, which must be cleared
//   before the funeral.
//
// Why this line: the first half is dry, ordinary inheritance boilerplate
// — an account passing to the next of kin reads like any real ToS. The
// second half keeps the same legal register and quietly turns absurd:
// the estate now includes 214 unread notifications, and clearing them
// is a chore owed before the funeral. The absurdity is concrete and
// countable (214 notifications, one deadline), it lands on a single
// reading with no setup outside the line, and the clause never explains
// its own joke.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The clause. One sentence, 147 characters, plain ASCII.
const CLAUSE =
  "Upon the User's death, their account passes to their next of kin, together with 214 unread notifications, which must be cleared before the funeral.";

// Fail loudly in local testing rather than silently failing the gate:
// one sentence, 1-200 characters, ends with a full stop, no newline.
if (CLAUSE.length < 1 || CLAUSE.length > 200) {
  throw new Error(`clause out of gate range: ${CLAUSE.length} characters`);
}
if (!CLAUSE.endsWith(".") || CLAUSE.includes("\n")) {
  throw new Error("clause must be a single line ending with a full stop");
}
// Exactly one sentence: one sentence-ending mark, and it is the last
// character. "214" carries no full stop, so a second period here would
// mean a second sentence sneaked in.
const terminators = (CLAUSE.match(/[.!?]/g) ?? []).length;
if (terminators !== 1) {
  throw new Error(`clause must be one sentence, found ${terminators} terminators`);
}

// Grader writes to /output/entry.txt; OUTPUT_DIR lets us test locally
// without root. Default matches the competition gate exactly.
const outDir = process.env.OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
// Byte-identical to CLAUSE: no trailing newline, no extra whitespace.
writeFileSync(join(outDir, "entry.txt"), CLAUSE, "utf8");
