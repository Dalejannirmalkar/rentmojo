let express = require("express");
let bodyParser = require("body-parser");
var http = require("http");

let app = express();
app.use(bodyParser.json());

app.use("/", require(__dirname + "/routes"));
var port = 1230;
var server = http.createServer(app);
server.listen(port);
server.on("listening", function() {
  console.log(`listen on ${port}`);
});
