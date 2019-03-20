const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { Group } = require('../models/group');
const { User } = require('../models/user');
const getGroups = require('../helper/getGroups');

function validate(req) {
  const schema = {
    gid: Joi.string().required(),
    user: Joi.string().required()
  };
  return Joi.validate(req, schema);
}

router.post('/', async (req, res) => {
  // Validate req
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  // Find if the user exist
  const user = await User.findOne({ user: req.body.user });
  if (!user) return res.status(400).send('User does not exist');

  // Find if the group exist & update the record
  await Group.findById(req.body.gid, (err, group) => {
    if (err) return res.status(400).send(err);

    const exist = group.participants.find(element => {
      return element.toString() === user._id.toString();
    });

    if (exist) return res.status(400).send('Already joined');

    group.participants.push(user._id);

    group.save();

    getGroups(res, req.body.user);
  });
});

module.exports = router;
