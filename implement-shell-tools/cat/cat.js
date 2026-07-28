import { program } from "commander";
import { promises as fs } from "node:fs";

program
  .name("cat")
  .description("Concatenate and print files")
  .argument("<paths...>", "The file paths to process")
  .option("-n", "Number lines")
  .option("-b", "Number non-blank lines");

program.parse();

function parseNumberMode(options) {
  if (options.b) {
    return "non-blank";
  } else if (options.n) {
    return "all";
  } else {
    return "none";
  }
}

function calculatePrefix(
  numberMode,
  nonBlankLineNumber,
  lineNumberIncludingBlanks,
  thisLineIsBlank,
) {
  if (numberMode === "none") {
    return "";
  }
  let lineNumber;
  if (numberMode === "all") {
    lineNumber = lineNumberIncludingBlanks;
  } else {
    if (thisLineIsBlank) {
      return "";
    } else {
      lineNumber = nonBlankLineNumber;
    }
  }
  return lineNumber.toString().padStart(6, " ") + "  ";
}

const numberMode = parseNumberMode(program.opts());

for (const path of program.args) {
  const content = await fs.readFile(path, "utf-8");
  const lines = content.split("\n");
  let nonBlankLineNumber = 1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (i === lines.length - 1 && line === "") {
      break;
    }
    const prefix = calculatePrefix(
      numberMode,
      nonBlankLineNumber,
      i + 1,
      line === "",
    );
    console.log(`${prefix}${line}`);
    if (line !== "") {
      nonBlankLineNumber += 1;
    }
  }
}
