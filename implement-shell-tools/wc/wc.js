import { program } from "commander";
import { promises as fs } from "node:fs";

program
  .name("check-for-wc")
  .description("Implement my own version of wc")
  .argument("<paths...>", "The file paths to process")
  .option("-l", "Counts the total number of lines")
  .option("-c", "Counts the total number of characters")
  .option("-w", "Counts the total number of words");

program.parse();

const paths = program.args;
const showLines = program.opts().l;
const showWords = program.opts().w;
const showChar = program.opts().c;

const noFlagsGiven = !showLines && !showWords && !showChar;

const columns = [];

for (const path of paths) {
  const content = await fs.readFile(path, "utf-8");

  const lineCount = content.split("\n").length - 1;

  const wordCount = content
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  const charCount = Buffer.byteLength(content, "utf-8");

  columns.push({
    path: path,
    lines: lineCount,
    words: wordCount,
    char: charCount,
  });
}
if (columns.length > 1) {
  let totalLines = 0;
  let totalWords = 0;
  let totalChar = 0;

  for (const result of columns) {
    totalLines += result.lines;
    totalWords += result.words;
    totalChar += result.char;
  }

  columns.push({
    path: "total",
    lines: totalLines,
    words: totalWords,
    char: totalChar,
  });
}

for (const result of columns) {
  let line = "";

  if (noFlagsGiven || showLines) {
    line += String(result.lines).padStart(6, " ");
  }
  if (noFlagsGiven || showWords) {
    line += String(result.words).padStart(6, " ");
  }
  if (noFlagsGiven || showChar) {
    line += String(result.char).padStart(6, " ");
  }

  line += " " + result.path;

  console.log(line);
}
