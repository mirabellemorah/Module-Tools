import argparse
import cowsay

parser = argparse.ArgumentParser(
    prog="cowsay",
    description="implementing cowsay and other animals",
)

parser.add_argument("speak", nargs="+", help="what to speak about",)
parser.add_argument("--animal", choices=cowsay.char_names, default="cow", help="The animal to be saying things.",)

args = parser.parse_args()

speak = " ".join(args.speak)

output = cowsay.get_output_string(args.animal, speak)
print(output)

#I can use the below as another approach to print directly and almost like saying cowsay.turtle
# animal_function = cowsay.char_funcs[args.animal]
# animal_function(speak)