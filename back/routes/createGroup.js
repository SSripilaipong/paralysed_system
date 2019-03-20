const express = require('express');
const router = express.Router();
const { Group, validate } = require('../models/group');
const { User } = require('../models/user');

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let group = await Group.findOne({ name: req.body.gname });
  if (group) return res.status(400).send('Group already exist');

  const user = await User.findOne({ user: req.body.user });
  if (!user) return res.status(400).send('User does not exist');

  const participants = [user];

  group = new Group({
    name: req.body.name,
    participants
  });

  try {
    await group.save();
  } catch (err) {
    return res.status(400).send(err.name.message);
  }

  res.send({
    gid: group._id,
    gname: group.name
  });
  console.log(group);
});

module.exports = router;
