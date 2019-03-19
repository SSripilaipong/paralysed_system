const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  // Look if the user exists
  const curUser = await User.findOne({ user: req.body.user });
  if (!curUser) return res.status(400).send('Invalid username or password');

  // validate password
  const validPassword = await bcrypt.compare(
    req.body.password,
    curUser.password
  );
  if (!validPassword)
    return res.status(400).send('Invalid username or password');
  // should not enter private key in the source code !!! should put it in the environment variable instead
  const token = {
    _id: curUser._id,
    user: curUser.user
  };
  res.send(token);
});
