import argparse

parser = argparse.ArgumentParser(
    prog="check-for-cat",
    description="Implement my own version of cat in python",
)

parser.add_argument("paths", nargs="+", help="The file paths to process")
parser.add_argument("-n", action="store_true", help="Number lines")
parser.add_argument("-b", action="store_true", help="Number non-blank lines")

args = parser.parse_args()

paths = args.paths
show_n = args.n
show_b = args.b

line_number = 1

for path in paths:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    ends_with_newline = content.endswith("\n")
    lines = content.split("\n")
    if ends_with_newline:
        lines.pop()

    new_lines = []
    for line in lines:
        if show_b:
            if line == "":
                new_lines.append(line)
            else:
                numbered = str(line_number).rjust(6, " ") + "\t" + line
                line_number += 1
                new_lines.append(numbered)
        elif show_n:
            numbered = str(line_number).rjust(6, " ") + "\t" + line
            line_number += 1
            new_lines.append(numbered)
        else:
            new_lines.append(line)
    lines = new_lines

    output = "\n".join(lines)
    if ends_with_newline:
        output += "\n"
    print(output, end="")