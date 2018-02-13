# Root directory
WD=$(dirname "$0")
ROOT=$WD/..
ROOT_ABS="$( cd $ROOT && pwd )"

# browserify executable
BROWSERIFY=browserify

# Client JS directory
JSC=$ROOT/forclient/js
# Server JS directory
JS=$ROOT/forsetup/js

$BROWSERIFY --no-bundle-external --full-paths \
    -r $JSC/__init__.json:__init__ \
    -r $JSC/core/services.js:services \
    -r $JSC/core/layout.js:layout \
    -r $JSC/tools/charts.js:charts \
    -r $JS/core/node/util.js:util \
    -r $JS/core/data.js:data \
    -r $JS/core/xpath/xpath.js:xpath \
    -r $JS/core/ieee754/index.js:ieee754 \
    -r $JS/core/base64js/index.js:base64-js \
    -r $JS/core/buffer/index.js:buffer \
    -r $JS/core/xml2js/xml2js.js:xml2js \
    -r $JS/core/node/events.js:events \
    -r $JS/core/sax/sax.js:sax \
    -r $JS/core/streams.js:streams \
    -r $JS/libs/css/index.js:css \
    -r $JS/tools/stl.js:stl \
    -r $JS/tools/empower.json:./empower.json \
    -r $JS/tools/empower.js:empower \
    -r $JS/core/xmldom/dom-parser.js:xmldom \
    -r $JS/tools/html.js:html | sed "s|$ROOT_ABS||g"


