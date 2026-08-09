#!/bin/bash

set -euo pipefail

# The input for this script is the persona.json file.
# What was the name of the first person to play the game?
# What was the name of the last person to play the game?
# Who had the highest score?
# The names of everyone who played the game directly after Daniel?

# cat person.json | jq -r .name
# jq [flags] 'filter' [file]

jq -r '.[0] | .name' persona.json
jq -r '.[-1] | .name' persona.json
jq -r '[.[] | .score] | max' persona.json
jq -r 'max_by(.score) | .name' persona.json
