URL=https://cem-dev-karim.eastus.cloudapp.azure.com
API=$URL/storyteller/api
COOKIES="-c cookie-jar.txt -b cookie-jar.txt"

# ping the service
curl $API/ping
echo

# upload STL markup
curl -L -X POST -Ffile=@samples/table/design.xml $COOKIES $API/files
echo
curl -L -X POST -Ffile=@samples/table/data.xml $COOKIES $API/files
echo

# format STL to PDF (store a cookie to the jar)
PARAMS='{"design":"8d5e9847c15f46188a768423a0172b76cfc154a0","data":"3495fb04afdde028447d3bb7ee11ba45366d3912","options":{"data":{"rules":"_default","source":"_default"},"driver":{"type":"pdf"},"properties":{"language":"en-US"},"validate":true}}'
curl -H "Content-Type: application/json" -X POST -d $PARAMS $COOKIES $API/stl
echo

# download resulting PDF (read cookie from the jar, otherwise we have no access)
curl $COOKIES $API/files/5f708910417e1c14dbcd602edd2ddf7d686d4eb3/contents > table.pdf

