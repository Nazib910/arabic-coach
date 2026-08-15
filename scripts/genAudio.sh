#!/usr/bin/env bash
# Generate pre-recorded Arabic audio assets for the 28 letters and the glossary
# words, plus the audio manifest (PRD F1, layer 1).
#
# Currently uses the macOS "Majed" Arabic voice (ar_001) at a slow, beginner
# pace. To upgrade to human recordings later, simply replace the files in
# public/audio/letters/<index>.m4a and public/audio/words/<index>.m4a with the
# same filenames (indices follow the order in letters.ts / glossary.ts) and
# regenerate the manifest.
#
# Requires: macOS `say` + `afconvert` (both built-in). Run from arabic-coach/.
set -euo pipefail

VOICE="${TTS_LOCAL_VOICE:-Majed}"
LETTER_RATE="${LETTER_RATE:-80}"
WORD_RATE="${WORD_RATE:-95}"

mkdir -p public/audio/letters public/audio/words

echo "Extracting letters and words…"
node -e '
const fs=require("fs");
const L=fs.readFileSync("src/data/letters.ts","utf8");
fs.writeFileSync("/tmp/ac_letters.txt",[...L.matchAll(/\{ ar: "([^"]+)", name/g)].map(m=>m[1]).join("\n"));
const G=fs.readFileSync("src/data/glossary.ts","utf8");
fs.writeFileSync("/tmp/ac_words.txt",[...G.matchAll(/^  "([^"]+)": \{ bn:/gm)].map(m=>m[1]).join("\n"));
'

echo "Generating letter audio…"
i=0; while IFS= read -r ch; do
  [ -z "$ch" ] && continue
  say -v "$VOICE" -r "$LETTER_RATE" "$ch" -o /tmp/ac.aiff
  afconvert /tmp/ac.aiff "public/audio/letters/$i.m4a" -f m4af -d aac
  i=$((i+1))
done < /tmp/ac_letters.txt

echo "Generating word audio…"
i=0; while IFS= read -r w; do
  [ -z "$w" ] && continue
  say -v "$VOICE" -r "$WORD_RATE" "$w" -o /tmp/ac.aiff
  afconvert /tmp/ac.aiff "public/audio/words/$i.m4a" -f m4af -d aac
  i=$((i+1))
done < /tmp/ac_words.txt

echo "Extracting model sentences…"
node -e '
const fs=require("fs");
const raw=fs.readFileSync("src/data/handcraftedLessons.ts","utf8");
const rows=raw.split("\n").filter(l=>/^\[".*\],?$/.test(l.trim()));
const set=new Set();
for(const line of rows){const parts=line.match(/"((?:[^"\\]|\\.)*)"/g); if(!parts||parts.length<6)continue;
  parts[5].slice(1,-1).split("|").forEach(m=>{const s=m.trim(); if(s&&/[\u0600-\u06FF]/.test(s))set.add(s);});}
fs.writeFileSync("/tmp/ac_sents.txt",[...set].join("\n"));
'

echo "Generating sentence audio…"
mkdir -p public/audio/sentences
i=0; while IFS= read -r s; do
  [ -z "$s" ] && continue
  say -v "$VOICE" -r "${SENT_RATE:-100}" "$s" -o /tmp/ac.aiff
  afconvert /tmp/ac.aiff "public/audio/sentences/$i.m4a" -f m4af -d aac
  i=$((i+1))
done < /tmp/ac_sents.txt

echo "Extracting passage lines…"
node -e '
const fs=require("fs");
const P=fs.readFileSync("src/data/passages.ts","utf8");
const set=new Set([...P.matchAll(/ar:\s*"((?:[^"\\]|\\.)*)"/g)].map(m=>m[1]).filter(s=>/[\u0600-\u06FF]/.test(s)));
fs.writeFileSync("/tmp/ac_pass.txt",[...set].join("\n"));
'

echo "Generating passage audio…"
mkdir -p public/audio/passages
i=0; while IFS= read -r s; do
  [ -z "$s" ] && continue
  say -v "$VOICE" -r "${SENT_RATE:-100}" "$s" -o /tmp/ac.aiff
  afconvert /tmp/ac.aiff "public/audio/passages/$i.m4a" -f m4af -d aac
  i=$((i+1))
done < /tmp/ac_pass.txt

echo "Writing manifest…"
node -e '
const fs=require("fs");
const letters=fs.readFileSync("/tmp/ac_letters.txt","utf8").split("\n").filter(Boolean);
const words=fs.readFileSync("/tmp/ac_words.txt","utf8").split("\n").filter(Boolean);
const sents=fs.readFileSync("/tmp/ac_sents.txt","utf8").split("\n").filter(Boolean);
const passages=fs.readFileSync("/tmp/ac_pass.txt","utf8").split("\n").filter(Boolean);
const map={};
letters.forEach((ar,i)=>{ map[ar]="/audio/letters/"+i+".m4a"; });
words.forEach((ar,i)=>{ if(!map[ar]) map[ar]="/audio/words/"+i+".m4a"; });
sents.forEach((ar,i)=>{ if(!map[ar]) map[ar]="/audio/sentences/"+i+".m4a"; });
passages.forEach((ar,i)=>{ if(!map[ar]) map[ar]="/audio/passages/"+i+".m4a"; });
const entries=Object.entries(map).map(([k,v])=>`  ${JSON.stringify(k)}: ${JSON.stringify(v)},`).join("\n");
fs.writeFileSync("src/data/audioManifest.ts",
`// AUTO-GENERATED audio manifest (PRD F1, layer 1). Run scripts/genAudio.sh.\n\nconst manifest: Record<string, string> = {\n${entries}\n};\n\nexport function getAudioAsset(text: string): string | undefined {\n  const t = text.trim();\n  if (manifest[t]) return manifest[t];\n  if (t.startsWith("\u0627\u0644") && manifest[t.slice(2)]) return manifest[t.slice(2)];\n  return undefined;\n}\n\nexport const audioAssetCount = Object.keys(manifest).length;\n`);
console.log("manifest entries:", Object.keys(map).length);
'
echo "Done."
