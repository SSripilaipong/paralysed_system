const express = require('express');
const router = express.Router();
const getCurrentMessage = require('../helper/getCurrentMessage');

router.post('/', async (req, res) => {
  const { gid, userId, message } = req.body;
  const currentMessage = await getCurrentMessage(gid, userId, message);
  res.send(currentMessage);
});

module.exports = router;
