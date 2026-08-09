import { program } from "commander";
import { promises as fs } from "node:fs";

program
  .name("check-for-ls")
  .description("Implement my own version of ls")
  .argument("[paths...]", "The file paths to process")
  .option("-1, --one", "This lists one file per line")
  .option("-a", "This shows all files");

program.parse();

const showOneLine = program.opts().one;
const showAllFiles = program.opts().a;
const paths = program.args;

let filePath = paths;
if (filePath.length === 0) {
  filePath = ["."];
}

for (const target of filePath) {
  const info = await fs.stat(target);

  let showFiles;
  if (info.isDirectory()) {
    showFiles = await fs.readdir(target);

    if (showAllFiles) {
      showFiles = [".", "..", ...showFiles];
    } else {
      showFiles = showFiles.filter((name) => !name.startsWith("."));
    }
    showFiles.sort();
  } else {
    showFiles = [target];
  }

  if (showOneLine) {
    for (const file of showFiles) {
      console.log(file);
    }
  } else {
    console.log(showFiles.join("  "));
  }
}
