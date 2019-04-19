#!/bin/bash

DEVICE1='wlanfront'  #'wlxc4e984e026ee'
DEVICE2='wlanback'   #'wlxa42bb0c0408d'



cd "/home/pi/"
#sleep 30

FOLDER="CHANNEL_SCAN"
i=0
while [[ -d "$FOLDER-$i" ]] ; do
	let i++
done
FOLDER="$FOLDER-$i"
mkdir $FOLDER


echo "Starting Drone Logger $FOLDER $MACFILTER"
killall -9 telemetry-saver
~/DroneSDK/build/bin/telemetry-saver "UserConfig.txt" "$FOLDER/drone.log"&

python drone_channel_strength.py "$FOLDER/channels.csv" &


