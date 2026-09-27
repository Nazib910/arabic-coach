import { confusablePairs, letters } from "@/data/letters";

/** Never introduce a sound that has not appeared in the current teaching set. */
export function getDrillPairs(subset: string[]): Array<[string, string]> {
  const known = [...new Set(subset)].filter(ch => letters.some(letter => letter.ar === ch));
  const pairs = confusablePairs.filter(([a, b]) => known.includes(a) && known.includes(b));
  return pairs.length ? pairs : known.length >= 2 ? [[known[0], known[1]]] : [];
}
