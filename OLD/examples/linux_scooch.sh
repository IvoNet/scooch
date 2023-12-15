#!/usr/bin/env bash
#########################################################################
# scooch
# Copyright (c) Ivo Woltring
#
# - put this script in your bin folder and chmod +x it
# - Adjust the needed line(s) below according to the instructions
# - make sure the docker-compose.yml file is configured correctly
#   (see example in same folder)
#
# DISCLAIMER
# This script has only been tested on my machine (Ubuntu linux) and
# No guarantees of any kind are implied or given. Use at your own risk!
#########################################################################
# Edit the line below to point to the folder where you have your slides #
# and your docker-compose.yml file                                      #
LOCATION=/home/USER/scooch
#########################################################################


#########################################################################
## Do not edit below this line
#########################################################################
cd $LOCATION

RUNNING=$(docker inspect --format="{{ .State.Running }}" scooch 2> /dev/null)

if [ $? -eq 1 ] || [ "$RUNNING" == "false" ]; then
  docker-compose up -d
else
  docker-compose down
fi