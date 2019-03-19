const mongoose = require("mongoose");

module.exports = database => mongoose.connect(database, { useNewUrlParser: true }, err => {
    if (err) {
      console.log("Some problem with the connection " + err);
    } else {
      console.log("The Mongoose connection is ready");
    }
});