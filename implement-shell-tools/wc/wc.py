import argparse
import re

parser = argparse.ArgumentParser(
    prog="check-for-wc",
    description="Implement my own version of wc",
)

parser.add_argument("paths", nargs="+", help="The file paths to process")
parser.add_argument("-l", action="store_true", help="Counts the total number of lines")
parser.add_argument("-c", action="store_true", help="Counts the total number of characters")
parser.add_argument("-w", action="store_true", help="Counts the total number of words")

args = parser.parse_args()

paths = args.paths
show_lines = args.l
show_words = args.w
show_char = args.c

no_flags_given = not show_lines and not show_words and not show_char

columns = []

for path in paths:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    line_count = content.count("\n")

    word_count = len([word for word in re.split(r"\s+", content) if word != ""])

    char_count = len(content.encode("utf-8"))

    columns.append({
        "path": path,
        "lines": line_count,
        "words": word_count,
        "char": char_count,
    })

if len(columns) > 1:
    total_lines = 0
    total_words = 0
    total_char = 0

    for result in columns:
        total_lines += result["lines"]
        total_words += result["words"]
        total_char += result["char"]

    columns.append({
        "path": "total",
        "lines": total_lines,
        "words": total_words,
        "char": total_char,
    })

for result in columns:
    line = ""
    if no_flags_given or show_lines:
        line += str(result["lines"]).rjust(6, " ")
    if no_flags_given or show_words:
        line += str(result["words"]).rjust(6, " ")
    if no_flags_given or show_char:
        line += str(result["char"]).rjust(6, " ")

    line += " " + result["path"]

    print(line)