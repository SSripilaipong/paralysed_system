const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import routes
const register = require('./routes/register');
const auth = require('./routes/auth');

//Middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());

// routes
app.use('/api/register', register); 
app.use('/api/login', auth);

// choose database
const fudgy = true;
const database = fudgy
  ? 'mongodb://fudgy:fudgylor1234@ds237669.mlab.com:37669/indiv-project'
  : 'mongodb://chain:chainlor123@ds119795.mlab.com:19795/se_project';
  
//Database connection
mongoose.connect(database, { useNewUrlParser: true }, err => {
  if (err) {
    console.log('Some problem with the connection ' + err);
  } else {
    console.log('The Mongoose connection is ready');
  }
});

//Get all courses
app.get('/', (req, res) => {
  mongoose.connection.db.collection('courses', (err, collection) => {
    collection.find({}).toArray((err, data) => {
      res.json(data);
    });
  });
});

app.listen(process.env.PORT || 8000);