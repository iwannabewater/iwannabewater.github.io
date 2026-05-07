import test from "node:test";
import assert from "node:assert/strict";
import { createPaperGrainPng } from "./texture.mjs";

test("paper grain generator returns a valid deterministic PNG", () => {
  const first = createPaperGrainPng(16, 16, 93);
  const second = createPaperGrainPng(16, 16, 93);
  assert.deepEqual([...first.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(Buffer.compare(first, second), 0);
  assert.ok(first.length > 100);
});
