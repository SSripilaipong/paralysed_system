const http = require("http");
const express = require("express");
const configExpress = require("./config/configExpress");
const configMongo = require("./config/configMongo");
const configSocket = require("./config/configSocket");

//Express
const app = express();
configExpress(app);

//Socket
server = http.Server(app);
configSocket(server);

//Database
const database =
  "mongodb://fudgy:fudgylor1234@ds117816.mlab.com:17816/parallel";
configMongo(database);

server.listen(process.env.PORT || 8000);
