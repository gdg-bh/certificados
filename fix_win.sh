#!/usr/bin/env bash

# (1) create the "hard" location of your files, inside your vagrant machine home directory (/home/vagrant/yourProjectName/node_modules)
#mkdir -p ~/yourProjectName/node_modules
# (2) link your project to the hard location, eg,  ln -s ~/mean/node_modules /var/www/mean/fc/myApp/node_modules
#ln -s ~/yourProjectName/node_modules /var/www/mean/yourProjectName/node_modules


# get the current directory
INTERNALDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

PROJECTDIR=${PWD}

#look for Gruntfile.js
GRUNTFILE="$PROJECTDIR/Gruntfile.js"

if [ -f $GRUNTFILE ];
then
  echo "Valid angular-fullstack directory"
  # make the node_modules directory within the dir that this script resides
  mkdir -p $INTERNALDIR/node_modules
  # symlink the project dir's nod_modules to the hard point
  ln -s $INTERNALDIR/node_modules $PROJECTDIR/node_modules
  echo "created symlink directory"
else
  echo "File $GRUNTFILE does not exists"
  echo "run this script from inside your angular-fullstack generated directory"
fi



