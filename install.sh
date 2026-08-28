#!/bin/sh
set -eu

cd "$(dirname "$0")"
kpackagetool6 --type=KWin/Script --upgrade . || kpackagetool6 --type=KWin/Script --install .
kwriteconfig6 --file kwinrc --group Plugins --key kdeRectangleEnabled true
qdbus6 org.kde.KWin /KWin reconfigure || printf '%s\n' 'Log out and back in to load KDE Rectangle.'
