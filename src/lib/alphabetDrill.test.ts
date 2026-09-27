import { test } from "node:test";
import assert from "node:assert/strict";
import { getDrillPairs } from "./alphabetDrill";
import { letters } from "../data/letters";
test("all drill options belong to the taught subset", () => {
  for (let size = 1; size <= letters.length; size++) {
    const subset = letters.slice(0, size).map(letter => letter.ar);
    assert.ok(getDrillPairs(subset).every(pair => pair.every(ch => subset.includes(ch))));
  }
});
test("empty duplicate or unknown letters never produce invalid choices", () => {
  for (const subset of [[], ["ب"], ["ب", "ب"], ["bad", "ب"]]) assert.deepEqual(getDrillPairs(subset), []);
  assert.deepEqual(getDrillPairs(["ق", "ك"]), [["ق", "ك"]]);
});
