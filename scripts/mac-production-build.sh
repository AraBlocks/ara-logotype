#!/bin/bash

echo "${BASH_SOURCE[0]}"

ANALYTICS_CONSTANTS=./lib/constants/analytics.js

sed -i.bak s/"const IS_PRODUCTION = "[[:print:]]*/"const IS_PRODUCTION = true"/ "$ANALYTICS_CONSTANTS"

echo 'Packaging production build'

electron-packager . \
--overwrite \
--platform=darwin \
--arch=x64 \
--icon=./build/icons/mac/ara.icns \
--prune=true \
--out=release-builds \
--app-bundle-id=\"com.ara.one.araFileManager\"

electron-osx-sign ./release-builds/Ara\ File\ Manager-darwin-x64/Ara\ File\ Manager.app/ --identity='Developer ID Application: Little Star Media, Inc. (HXEASF63SW)'

sed -i.bak s/"const IS_PRODUCTION = "[[:print:]]*/"const IS_PRODUCTION = false"/ "$ANALYTICS_CONSTANTS"

npm run mac-installer