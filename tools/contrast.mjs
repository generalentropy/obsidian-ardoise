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
  const v = mapping[name] ?? palette[mode][name];
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
    ["Link to a missing note (60% opacity)", { fg: "--link-unresolved-color", alpha: 0.6 }, page, "text"],
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
  if (spec.fg) return { ...color(mode, spec.fg), a: spec.alpha };
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
writeFileSync(join(root, "CONTRAST.md"), md, "utf8");
console.log(`CONTRAST.md written (${summary.join(", ")})`);
