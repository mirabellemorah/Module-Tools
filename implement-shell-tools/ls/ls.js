import { promises as fs } from "node:fs";
import process from "node:process";

const argv = process.argv.slice(2);

const flags = [];
const paths = [];

for (const arg of argv) {
  if (arg.startsWith("-")) {
    flags.push(arg);
  } else {
    paths.push(arg);
  }
}

const showOnePerLine = flags.includes("-1");
const showHiddenFiles = flags.includes("-a");

let targets = paths;
if (targets.length === 0) {
  targets = ["."];
}

for (const target of targets) {
  const info = await fs.stat(target);

  let namesToShow;

  if (info.isDirectory()) {
    namesToShow = await fs.readdir(target);

    if (showHiddenFiles) {
      namesToShow = [".", "..", ...namesToShow];
    } else {
      namesToShow = namesToShow.filter((name) => !name.startsWith("."));
    }

    namesToShow.sort();
  } else {
    namesToShow = [target];
  }

  for (const name of namesToShow) {
    console.log(name);
  }
}
