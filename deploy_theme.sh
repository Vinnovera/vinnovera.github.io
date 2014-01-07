#!/bin/sh
git submodule foreach git pull origin master
rake install['vinnoveraTheme']
rake generate && rake deploy
git add source
git commit -am "`date`" && git push origin source