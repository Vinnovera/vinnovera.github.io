#!/bin/sh
rm -rf _deploy
git clone https://github.com/Vinnovera/vinnovera.github.io.git _deploy
rake generate && rake deploy