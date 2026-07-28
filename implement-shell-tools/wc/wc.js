import { program } from "commander";
import { promises as fs } from "node:fs";

const argv = process.argv.slice(2);

const flags = argv.filter((arg) => arg.startsWith("-"));
const paths = argv.filter((arg) => !arg.startsWith("-"));

const showLines = flags.includes("-l");
const showWords = flags.includes("-w");
const showBytes = flags.includes("-c");

const noFlagsGiven = !showLines && !showWords && !showBytes;

const columns = [];
if (noFlagsGiven || showLines) columns.push("lines");
if (noFlagsGiven || showWords) columns.push("words");
if (noFlagsGiven || showBytes) columns.push("bytes");

function countStats(content) {
  const lines = (content.match(/\n/g) || []).length;
  const words = content.split(/\s+/).filter((w) => w.length > 0).length;
  const bytes = Buffer.byteLength(content, "utf-8");
  return { lines, words, bytes };
}

// Read every file and collect its stats
const rows = [];
for (const path of paths) {
  const content = await fs.readFile(path, "utf-8");
  rows.push({ path, stats: countStats(content) });
}

// If there's more than one file, we also need a "total" row at the end
if (rows.length > 1) {
  const total = { lines: 0, words: 0, bytes: 0 };
  for (const { stats } of rows) {
    total.lines += stats.lines;
    total.words += stats.words;
    total.bytes += stats.bytes;
  }
  rows.push({ path: "total", stats: total });
}

const needsAlignment = columns.length > 1 || rows.length > 1;

let width = 0;
if (needsAlignment) {
  for (const { stats } of rows) {
    for (const col of columns) {
      width = Math.max(width, String(stats[col]).length);
    }
  }

  width = Math.max(width, 3);
}

for (const { path, stats } of rows) {
  const parts = columns.map((col, index) => {
    const text = String(stats[col]);
    if (!needsAlignment) {
      return text;
    }
    const padded = text.padStart(width, " ");

    return index === 0 ? padded : " " + padded;
  });

  console.log(`${parts.join("")} ${path}`);
}
