#! /bin/bash -e
npm install
sudo npm install grunt-cli -g
sudo gem update --system && sudo gem install compass
grunt

echo "Please, run the HTTP server using \"node server.js --port <PORT>\""
echo "(Run \"grunt watch\" before modifying Jade and SCSS files)"