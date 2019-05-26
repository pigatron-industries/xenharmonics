#!/bin/bash

mkfifo /dev/sequencer
chmod ugo+rw /dev/sequencer
raveloxmidi -N -c /home/pi/workspace/xenharmonics/service/raveloxmidi.conf

