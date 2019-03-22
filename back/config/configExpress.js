const cors = require('cors');
const bodyParser = require('body-parser');
const morgan  = require('morgan')

// import routes
const register = require('../routes/register');
const auth = require('../routes/auth');
const groups = require('../routes/groups');
const createGroup = require('../routes/createGroup');
const join = require('../routes/join');
const message = require('../routes/message');
const sent = require('../routes/sent');
const leave = require('../routes/leave');

const configRoute = app => {
  app.use('/api/register', register);
  app.use('/api/login', auth);
  app.use('/api/groups', groups);
  app.use('/api/create-group', createGroup);
  app.use('/api/join', join);
  app.use('/api/message', message);
  app.use('/api/sent', sent);
  app.use('/api/leave', leave);
};

const configMiddleware = app => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(morgan('combined'))
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    ); 
    next();
  });
};

const configExpress = app => {
  configMiddleware(app);
  configRoute(app);
};

module.exports = configExpress;
