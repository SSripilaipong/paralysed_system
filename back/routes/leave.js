const express = require('express');
const router = express.Router();
const { Group } = require('../models/group');
const { User } = require('../models/user');
const Joi = require('joi');
const getGroups = require('../helper/getGroups');

function validate(req) {
  const schema = {
    gid: Joi.string().required(),
    user: Joi.string().required()
  };
  return Joi.validate(req, schema);
}
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  const { gid, user } = req.body;

  const userId = (await User.findOne({ user }))._id;

  await Group.findById(gid, async (err, group) => {
    if (err) return res.send(err);
    const index = group.participants.indexOf(userId);

    if (index > -1) {
      group.participants.splice(index, 1);
      try {
        await group.save();
        const groups = await getGroups(user);
        if (!groups) return res.send('Get groups fail');
        res.send({ groups });
      } catch (e) {
        res.send(e);
      }
    } else res.send('you are not in the group');
  });
});

module.exports = router;
