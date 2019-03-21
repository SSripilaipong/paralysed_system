const express = require("express");
const router = express.Router();
const { User, validate } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

router.post("/", async (req, res) => {
  // validate the req
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { user, password } = req.body;
  // find if the username already exist
  let newUser = await User.findOne({ user });
  if (newUser) return res.status(400).send("User already registered.");

  newUser = new User({ user, password });

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  try {
    await newUser.save();
  } catch (e) {
    return res.status(400).send(e.errors.user.message);
  }

  res.send(_.pick(newUser, ["_id", "user"]));
});

module.exports = router;
