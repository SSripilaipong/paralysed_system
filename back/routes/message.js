const express = require('express');
const { Message } = require('../models/message');
const router = express.Router();

router.post('/', async (req, res) => {
  const { gid } = req.body;
  if (!gid) return res.status(400).send('Invalid parameter value');

  try {
    const messages = await Message.find({ groupId: gid }, null, {
      sort: { _id: -1 }
    });
    // console.log(messages);
    res.send(messages);
  } catch (e) {
    res.send(messages);
  }
});

module.exports = router;
