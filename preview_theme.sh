#!/bin/sh
git submodule foreach git pull origin master
rake install['vinnoveraTheme']
rake preview