// Writes CONTRAST.md: WCAG contrast ratios of the text and interface colours Ardoise uses.
//
// Colours are read from theme.css (the two palettes and the mapping to Obsidian variables),
// so the report follows any change to the palette. No dependencies.
//
// Usage, from the repository root:
//   node tools/contrast.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const css = readFileSync(join(root, "theme.css"), "utf8").replace(/\r/g, "").split(" * Embedded fonts")[0];

// --- Read declarations ---------------------------------------------------------------------------
function block(selector) {
  const start = css.indexOf(selector);
  if (start < 0) throw new Error(`block not found: ${selector}`);
  const body = css.slice(css.indexOf("{", start) + 1, css.indexOf("\n}", start));
  return Object.fromEntries([...body.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
}
const palette = { dark: block(".theme-dark {"), light: block(".theme-light {") };
const mapping = block(".theme-dark,\n.theme-light {");

// --- Resolve colours -------------------------------------------------------------------------------
const hex = (h) => ({ r: parseInt(h.slice(1, 3), 16), g: parseInt(h.slice(3, 5), 16), b: parseInt(h.slice(5, 7), 16), a: 1 });
function raw(mode, name) {
  const v = palette[mode][name] ?? mapping[name]; // palette first: Style Settings blocks can override mapped variables
  if (v === undefined) throw new Error(`unknown variable ${name}`);
  return v;
}
function triple(mode, name) {
  const v = raw(mode, name);
  const m = v.match(/^var\((--[a-z0-9-]+)\)$/);
  if (m) return triple(mode, m[1]);
  const [r, g, b] = v.split(",").map((x) => parseFloat(x));
  return { r, g, b };
}
function color(mode, name) {
  const v = raw(mode, name);
  let m;
  if ((m = v.match(/^var\((--[a-z0-9-]+)\)$/))) return color(mode, m[1]);
  if ((m = v.match(/^#([0-9a-f]{6})$/i))) return hex(v);
  if ((m = v.match(/^rgba\(var\((--[a-z0-9-]+)\),\s*([\d.]+)\)$/))) return { ...triple(mode, m[1]), a: +m[2] };
  if ((m = v.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/))) return { r: +m[1], g: +m[2], b: +m[3], a: +m[4] };
  throw new Error(`cannot read colour ${name}: ${v}`);
}
const over = (fg, bg) => ({
  r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1,
});
const toHex = (c) => "#" + [c.r, c.g, c.b].map((x) => Math.round(x).toString(16).padStart(2, "0")).join("");
function luminance(c) {
  const f = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
}
const ratio = (a, b) => { const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x); return (l1 + 0.05) / (l2 + 0.05); };

// --- What to check -------------------------------------------------------------------------------
// kind: "text" needs 4.5:1, "large" (text of 24px or more) and "ui" (icons, borders, controls) need 3:1.
// fg / bg are variable names; an object { on, alpha } means a translucent colour laid over a background.
const page = "--background-primary";
const callout = (name) => ({ tint: name, alpha: 0.1, on: page }); // Obsidian tints callouts at 10%
const groups = [
  ["Note text", [
    ["Body text", "--text-normal", page, "text"],
    ["Bold", "--bold-color", page, "text"],
    ["Secondary text", "--text-muted", page, "text"],
    ["Faint text (h6, list markers, done tasks)", "--text-faint", page, "text"],
    ["Blockquote", "--blockquote-color", page, "text"],
    ["Link", "--link-color", page, "text"],
    ["Link to a missing note (faded)", { fg: "--link-unresolved-color", alphaVar: "--link-unresolved-opacity" }, page, "text"],
    ["Tag", "--tag-color", { tint: "--tag-background", on: page }, "text"],
    ["Highlighted text", "--text-normal", { tint: "--text-highlight-bg", on: page }, "text"],
  ]],
  ["Headings", [
    ["Heading 1 (about 27px)", "--h1-color", page, "large"],
    ["Heading 2", "--h2-color", page, "text"],
    ["Heading 3", "--h3-color", page, "text"],
    ["Heading 4", "--h4-color", page, "text"],
    ["Heading 5", "--h5-color", page, "text"],
    ["Heading 6", "--h6-color", page, "text"],
  ]],
  ["Code", [
    ["Inline code", "--rose", "--code-background", "text"],
    ["Code block text", "--code-normal", "--code-background", "text"],
    ["Comment", "--code-comment", "--code-background", "text"],
    ["String", "--code-string", "--code-background", "text"],
    ["Function", "--code-function", "--code-background", "text"],
    ["Keyword", "--code-keyword", "--code-background", "text"],
    ["Property", "--code-property", "--code-background", "text"],
    ["Value", "--code-value", "--code-background", "text"],
    ["Tag", "--code-tag", "--code-background", "text"],
    ["Important", "--code-important", "--code-background", "text"],
    ["Operator", "--code-operator", "--code-background", "text"],
    ["Punctuation", "--code-punctuation", "--code-background", "text"],
  ]],
  ["Callout titles", [
    ["Blue (note, info)", "--color-blue", callout("--color-blue-rgb"), "text"],
    ["Cyan (tip, abstract)", "--color-cyan", callout("--color-cyan-rgb"), "text"],
    ["Green (success)", "--color-green", callout("--color-green-rgb"), "text"],
    ["Orange (warning, question)", "--color-orange", callout("--color-orange-rgb"), "text"],
    ["Red (danger, bug)", "--color-red", callout("--color-red-rgb"), "text"],
    ["Purple (example)", "--color-purple", callout("--color-purple-rgb"), "text"],
  ]],
  ["Interface", [
    ["File explorer", "--nav-item-color", "--background-secondary", "text"],
    ["File explorer, active file", "--nav-item-color-active", "--nav-item-background-active", "text"],
    ["Tab", "--tab-text-color", "--tab-container-background", "text"],
    ["Active tab", "--tab-text-color-focused-active", "--tab-background-active", "text"],
    ["Status bar", "--status-bar-text-color", "--status-bar-background", "text"],
    ["Text on accent (buttons)", "--text-on-accent", "--interactive-accent", "text"],
    ["Icons", "--icon-color", "--background-secondary", "ui"],
    ["Checkbox border", "--checkbox-border-color", page, "ui"],
    ["Checked box", "--checkbox-color", page, "ui"],
  ]],
  ["Alternate checkbox icons", [
    ["Yellow (question, star, idea, key)", "--color-yellow", page, "ui"],
    ["Orange (important, cons, bookmark)", "--color-orange", page, "ui"],
    ["Red (location, fire, down)", "--color-red", page, "ui"],
    ["Green (savings, pros, up)", "--color-green", page, "ui"],
    ["Purple (win)", "--color-purple", page, "ui"],
    ["Faint (cancelled, forwarded, scheduling)", "--text-faint", page, "ui"],
  ]],
];

function resolve(mode, spec) {
  if (typeof spec === "string") return color(mode, spec);
  if (spec.fg) return { ...color(mode, spec.fg), a: parseFloat(raw(mode, spec.alphaVar)) };
  const base = color(mode, spec.on);
  const tint = spec.tint.endsWith("-rgb") ? { ...triple(mode, spec.tint), a: spec.alpha } : color(mode, spec.tint);
  return over(tint, base);
}

// --- Report ---------------------------------------------------------------------------------------
const need = { text: 4.5, large: 3, ui: 3 };
let md = `# Contrast

Contrast ratios of the colours Ardoise uses, measured with the [WCAG 2](https://www.w3.org/TR/WCAG22/#contrast-minimum) formula. Ardoise aims for level AA:

- 4.5:1 for text
- 3:1 for large text (24px and up) and for icons, borders and controls

Translucent colours (tag pills, highlights, callout backgrounds, links to missing notes) are measured as they appear, laid over the note background.

This file is generated from \`theme.css\` by \`node tools/contrast.mjs\`.
`;
const summary = [];
for (const mode of ["dark", "light"]) {
  let pass = 0, total = 0;
  md += `\n## ${mode === "dark" ? "Dark" : "Light"} mode\n`;
  for (const [title, rows] of groups) {
    md += `\n### ${title}\n\n| Element | Colour | Background | Ratio | AA |\n| --- | --- | --- | ---: | --- |\n`;
    for (const [label, fgSpec, bgSpec, kind] of rows) {
      const bg = resolve(mode, bgSpec);
      const fg = over(resolve(mode, fgSpec), bg);
      const r = ratio(fg, bg);
      const ok = r >= need[kind] - 0.005;
      total++; if (ok) pass++;
      md += `| ${label} | \`${toHex(fg)}\` | \`${toHex(bg)}\` | ${r.toFixed(2)}:1 | ${ok ? "Pass" : `**Below** (${need[kind]}:1)`} |\n`;
    }
  }
  summary.push(`${mode}: ${pass}/${total} pass`);
}

// --- Style Settings options ------------------------------------------------------------------------
// Each option is a block such as `.theme-dark.ardoise-accent-blue { ... }` laid over the palette.
const options = (prefix) => [...css.matchAll(new RegExp(`\\.theme-dark\\.ardoise-${prefix}-([a-z]+) \\{`, "g"))].map((m) => m[1]);
function withOptions(mode, classes, fn) {
  const base = palette[mode];
  palette[mode] = Object.assign({}, base, ...classes.map((c) => block(`.theme-${mode}.${c} {`)));
  try { return fn(); } finally { palette[mode] = base; }
}
function measure(mode, [, fgSpec, bgSpec, kind]) {
  const bg = resolve(mode, bgSpec);
  const r = ratio(over(resolve(mode, fgSpec), bg), bg);
  return { r, ok: r >= need[kind] - 0.005 };
}
const cap = (s) => s[0].toUpperCase() + s.slice(1);
const modeName = (mode) => (mode === "dark" ? "Dark" : "Light");
const accents = ["ochre", ...options("accent")];
const accentClasses = (name) => (name === "ochre" ? [] : [`ardoise-accent-${name}`]);
const accentRows = [
  ["Link", "--link-color", page, "text"],
  ["Text on accent", "--text-on-accent", "--interactive-accent", "text"],
  ["Highlighted text", "--text-normal", { tint: "--text-highlight-bg", on: page }, "text"],
];

md += `\n## Style Settings options\n\nThe options offered in the [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) plugin. The tables above use the defaults: slate background, ochre accent.\n`;

// Accent colours
md += `\n### Accent colours\n\nRatios below 4.5:1 are in bold.\n
| Accent | Mode | ${accentRows.map((r) => r[0]).join(" | ")} |\n| --- | --- |${" ---: |".repeat(accentRows.length)}\n`;
let accentPass = 0, accentTotal = 0;
for (const name of accents) {
  for (const mode of ["dark", "light"]) {
    const cells = withOptions(mode, accentClasses(name), () => accentRows.map((row) => {
      const { r, ok } = measure(mode, row);
      accentTotal++; if (ok) accentPass++;
      return ok ? `${r.toFixed(2)}:1` : `**${r.toFixed(2)}:1**`;
    }));
    md += `| ${cap(name)} | ${modeName(mode)} | ${cells.join(" | ")} |\n`;
  }
}
summary.push(`accents: ${accentPass}/${accentTotal} pass`);

// Other options: every row above, measured again, with only the rows that move listed.
// Classes are applied in the order of their blocks in theme.css; a dotted entry such as
// "ardoise-bg-warm.ardoise-high-contrast" is a block that needs both classes.
const variants = [
  { title: "Warm background", short: "Warm", classes: ["ardoise-bg-warm"] },
  { title: "Higher contrast", short: "Higher contrast", classes: ["ardoise-high-contrast"] },
  {
    title: "Higher contrast on the warm background", short: "Both",
    classes: ["ardoise-bg-warm", "ardoise-high-contrast", "ardoise-bg-warm.ardoise-high-contrast"],
  },
];
const rows = [
  ...groups.flatMap(([, list]) => list).map((row) => ({ label: row[0], row, accent: "ochre" })),
  ...accents.flatMap((name) => accentRows.map((row) => ({ label: `${row[0]}, ${name} accent`, row, accent: name }))),
];
for (const { title, short, classes } of variants) {
  let pass = 0, textPass = 0, textTotal = 0, total = 0, moved = "";
  for (const mode of ["dark", "light"]) {
    for (const { label, row, accent } of rows) {
      const before = withOptions(mode, accentClasses(accent), () => measure(mode, row));
      const after = withOptions(mode, [...classes, ...accentClasses(accent)], () => measure(mode, row));
      total++; if (after.ok) pass++;
      if (row[3] === "text") { textTotal++; if (after.ok) textPass++; }
      if (Math.abs(after.r - before.r) >= 0.05 || after.ok !== before.ok) {
        moved += `| ${label} | ${modeName(mode)} | ${before.r.toFixed(2)}:1 | ${after.r.toFixed(2)}:1 | ${after.ok ? "Pass" : `**Below** (${need[row[3]]}:1)`} |\n`;
      }
    }
  }
  md += `\n### ${title}\n\nEvery row above, measured again: ${pass} of ${total} pass, including ${textPass} of ${textTotal} text rows. `;
  md += moved
    ? `Rows whose ratio moves by 0.05 or more:\n\n| Element | Mode | Default | ${short} | AA |\n| --- | --- | ---: | ---: | --- |\n${moved}`
    : `No ratio moves by 0.05 or more.\n`;
  summary.push(`${short.toLowerCase()}: ${pass}/${total} pass`);
}
writeFileSync(join(root, "CONTRAST.md"), md, "utf8");
console.log(`CONTRAST.md written (${summary.join(", ")})`);
