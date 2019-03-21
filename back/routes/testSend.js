const express = require('express');
const router = express.Router();
const getCurrentMessage = require('../helper/getCurrentMessage');

router.post('/', async (req, res) => {
  const { gid, userObj, message } = req.body;
  const currentMessage = await getCurrentMessage(gid, userObj, message);
  res.send(currentMessage);
});

module.exports = router;
