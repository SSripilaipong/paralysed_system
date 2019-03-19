const express = require('express');
const bodyParser = require('body-parser');

// Import routes
const register = require('./routes/register');
const auth = require('./routes/auth');

const app = express();

// Database connection
const database =
  'mongodb://fudgy:fudgylor1234@ds117816.mlab.com:17816/parallel';
mongoose.connect(database, { useNewUrlParser: true }, err => {
  if (err) {
    console.log('Some problem with the connection ' + err);
  } else {
    console.log('The Mongoose connection is ready');
  }
});
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/register', register);
app.use('/api/login', auth);

app.listen(process.env.PORT || 8000);
