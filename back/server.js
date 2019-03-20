const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// import routes
const register = require("./routes/register");
const auth = require("./routes/auth");
const groups = require("./routes/groups");
const createGroup = require("./routes/createGroup");
const join = require("./routes/join");
const message = require("./routes/message");
const sent = require("./routes/sent");
const leave = require("./routes/leave");

//Middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/api/register", register);
app.use("/api/login", auth);
app.use("/api/groups", groups);
app.use("/api/create-group", createGroup);
app.use("/api/join", join);
app.use("/api/message", message);
app.use("/api/sent", sent);
app.use("/api/leave", leave);

const database =
  "mongodb://fudgy:fudgylor1234@ds117816.mlab.com:17816/parallel";

//Database connection
mongoose.connect(database, { useNewUrlParser: true }, err => {
  if (err) {
    console.log("Some problem with the connection " + err);
  } else {
    console.log("The Mongoose connection is ready");
  }
});

app.listen(process.env.PORT || 8000);
