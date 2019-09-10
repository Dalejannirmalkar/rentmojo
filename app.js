const express = require("express");
const http = require("http");
const apicall = require("./controller/apicall");
let app = express();
app.use("/call", apicall.calling);

app.eventNames();
var port = 1230;
var server = http.createServer(app);
server.listen(port);
server.on("listening", function() {
  console.log(`listen on ${port}`);
});
