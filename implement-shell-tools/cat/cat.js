import { program } from "commander";
import { promises as fs } from "node:fs";

program
  .name("check-for-cat")
  .description("Implement my own version of cat")
  .argument("<paths...>", "The file paths to process")
  .option("-n", "Number lines")
  .option("-b", "Number non-blank lines");

program.parse();

const paths = program.args;
const showN = program.opts().n;
const showB = program.opts().b;

let lineNumber = 1;

for (const path of paths) {
  const content = await fs.readFile(path, "utf-8");

  const endsWithNewline = content.endsWith("\n");
  let lines = content.split("\n");
  if (endsWithNewline) {
    lines.pop();
  }

  lines = lines.map((line) => {
    if (showB) {
   
      if (line === "") {
        return line;
      }
      const numbered = String(lineNumber).padStart(6, " ") + "\t" + line;
      lineNumber++;
      return numbered;
    } else if (showN) {
    
      const numbered = String(lineNumber).padStart(6, " ") + "\t" + line;
      lineNumber++;
      return numbered;
    } else {
     
      return line;
    }
  });

  let output = lines.join("\n");
  if (endsWithNewline) {
    output += "\n";
  }
  process.stdout.write(output);
}
