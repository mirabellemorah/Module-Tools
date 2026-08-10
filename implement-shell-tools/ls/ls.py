import argparse
import os
import stat

parser = argparse.ArgumentParser(
    prog="check-for-ls",
    description="Implement my own version of ls",
)

parser.add_argument("paths", nargs="*", help="The file paths to process")
parser.add_argument("-1", "--one", action="store_true", help="This lists one file per line")
parser.add_argument("-a", action="store_true", help="This shows all files")

args = parser.parse_args()

show_one_line = args.one
show_all_files = args.a

paths = args.paths
file_path = paths
if len(file_path) == 0:
    file_path = ["."]

for target in file_path:
    info = os.stat(target)

    if stat.S_ISDIR(info.st_mode):
        show_files = os.listdir(target)

        if show_all_files:
            show_files = [".", "..", *show_files]
        else:
            show_files = [name for name in show_files if not name.startswith(".")]

        show_files.sort()
    else:
        show_files = [target]

    if show_one_line:
        for file in show_files:
            print(file)
    else:
        print("  ".join(show_files))