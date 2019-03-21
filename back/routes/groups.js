const express = require('express');
const router = express.Router();
const getGroups = require('../helper/getGroups');

router.get('/:user', async (req, res) => {
  let { user } = req.params;
  if (!user) res.status(400).send('Invalid parameter value');
  const groups = await getGroups(user);
  if (!groups) return res.send('Get groups fail');
  res.send({ groups });
});

module.exports = router;
