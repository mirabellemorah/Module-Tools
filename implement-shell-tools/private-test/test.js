import { program } from "commander";
import { promises as fs } from "node:fs";
import process from "node:process";

program
  .name("count-containing-words")
  .description("Counts words in a file that contain a particular character")
  .option("-c, --char <char>", "The character to search for", "e")
  .argument("<path>", "The file path to process");

program.parse();

const argv = program.args;
if (argv.length != 1) {
  console.error(
    `Expected exactly 1 argument (a path) to be passed but got ${argv.length}.`,
  );
  process.exit(1);
}
const path = argv[0];
const char = program.opts().char;

const content = await fs.readFile(path, "utf-8");
const countOfWordsContainingChar = content
  .split(" ")
  .filter((word) => word.includes(char)).length;
console.log(countOfWordsContainingChar);
