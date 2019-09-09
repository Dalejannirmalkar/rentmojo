let express = require("express");
var http = require("http");

let app = express();

var port = 1230;
var server = http.createServer(app);
server.listen(port);
server.on("listening", function() {
  console.log(`listen on ${port}`);
});
