// Rebuilds the embedded fonts at the bottom of theme.css.
//
// Everything above the "Polices intégrées" block in theme.css is the editable source.
// This script keeps it as is, subsets the fonts in ../fonts to Latin characters,
// converts them to WOFF2, and writes them back as @font-face rules with data URIs.
//
// Usage, from the repository root:
//   npm install --prefix tools        (once)
//   node tools/build-fonts.mjs        (rewrites theme.css)

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import subsetFont from "subset-font";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const themePath = resolve(process.argv[2] ?? join(root, "theme.css"));
const fontDir = join(root, "fonts");

// Characters to keep: Basic Latin, Latin-1, Latin Extended-A, Latin Extended Additional
// (Vietnamese and others), general punctuation, super/subscripts, currency, arrows, a few symbols.
const ranges = [
  [0x20, 0x7e], [0xa0, 0xff], [0x100, 0x17f], [0x192, 0x192], [0x218, 0x21b], [0x237, 0x237],
  [0x2bb, 0x2bc], [0x2c6, 0x2c7], [0x2c9, 0x2c9], [0x2d8, 0x2dd], [0x300, 0x30f], [0x323, 0x328],
  [0x1e00, 0x1eff], [0x2000, 0x206f], [0x2070, 0x209f], [0x20a0, 0x20cf], [0x2100, 0x2122],
  [0x2190, 0x2199], [0x2202, 0x2202], [0x2206, 0x2206], [0x220f, 0x2219], [0x221a, 0x221e],
  [0x222b, 0x222b], [0x2248, 0x2248], [0x2260, 0x2265], [0x25a0, 0x25cf], [0x2713, 0x2717],
  [0xfb01, 0xfb02], [0xfeff, 0xfeff], [0xfffd, 0xfffd],
];
let text = "";
for (const [a, b] of ranges) for (let c = a; c <= b; c++) text += String.fromCodePoint(c);
const unicodeRange = ranges
  .map(([a, b]) => (a === b ? `U+${a.toString(16)}` : `U+${a.toString(16)}-${b.toString(16)}`))
  .join(", ");

// Name table entries kept in each font: copyright (0), family names (1-6), license (13, 14).
const keepNames = [0, 1, 2, 3, 4, 5, 6, 13, 14];

const faces = [
  { family: "Ardoise Sans", file: "HankenGrotesk-RegularVariable.ttf", style: "normal", weight: "100 900" },
  { family: "Ardoise Sans", file: "HankenGrotesk-ItalicVariable.ttf", style: "italic", weight: "100 900" },
  // Headings: SOFT and WONK pinned (soft, no wonky forms), weights limited to 500-700.
  {
    family: "Ardoise Titre", file: "Fraunces-Regular.ttf", style: "normal", weight: "500 700",
    axes: { SOFT: 100, WONK: 0, wght: { min: 500, max: 700, default: 600 } },
  },
  { family: "Ardoise Mono", file: "GeistMono-Regular.ttf", style: "normal", weight: "100 900" },
];

// Keep the editable part of theme.css, drop the previous fonts block.
const theme = readFileSync(themePath, "utf8");
const marker = "\n\n/* =========================================================================\n * Polices intégrées";
const cut = theme.indexOf(marker);
if (cut < 0) {
  console.error("Fonts block marker not found in theme.css, nothing written.");
  process.exit(1);
}
let css = theme.slice(0, cut);

css += `

/* =========================================================================
 * Polices intégrées (SIL Open Font License 1.1), allégées : caractères latins, format WOFF2.
 * Rien à modifier en dessous.
 * ========================================================================= */
`;
for (const f of faces) {
  const src = readFileSync(join(fontDir, f.file));
  const out = await subsetFont(src, text, {
    targetFormat: "woff2",
    preserveNameIds: keepNames,
    ...(f.axes ? { variationAxes: f.axes } : {}),
  });
  console.log(`${f.file.padEnd(36)} ${String(Math.round(src.length / 1024)).padStart(4)} KB -> ${String(Math.round(out.length / 1024)).padStart(4)} KB`);
  css += `/* ${f.family} ${f.style} : ${f.file} */
@font-face {
  font-family: "${f.family}";
  src: url(data:font/woff2;base64,${out.toString("base64")}) format("woff2");
  font-weight: ${f.weight};
  font-style: ${f.style};
  font-display: swap;
  unicode-range: ${unicodeRange};
}
`;
}

writeFileSync(themePath, css, "utf8");
console.log(`theme.css: ${Math.round(Buffer.byteLength(css) / 1024)} KB`);
