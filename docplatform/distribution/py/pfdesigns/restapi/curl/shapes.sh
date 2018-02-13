URL=https://cem-dev-karim.eastus.cloudapp.azure.com
API=$URL/storyteller/api
COOKIES="-c cookie-jar.txt -b cookie-jar.txt"

# ping the service
curl $API/ping
echo

# upload STL markup
curl -L -X POST -Ffile=@samples/shapes/shapes.xml $COOKIES $API/files
echo

# format STL to PDF (store a cookie to the jar)
PARAMS='{"design":"e6707ad5d37c4c63cca925cce7299d1a7a05b5ea","options":{"data":{"rules":"_default","source":"_default"},"driver":{"type":"pdf"},"properties":{"language":"en-US"},"validate":true}}'
curl -H "Content-Type: application/json" -X POST -d $PARAMS $COOKIES $API/stl
echo

# download resulting PDF (read cookie from the jar, otherwise we have no access)
curl $COOKIES $API/files/501b8b8672a0bf4f2140a57d829a761968e298bd/contents > shapes.pdf

