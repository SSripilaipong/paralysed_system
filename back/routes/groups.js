const express = require('express');
const router = express.Router();
const getGroups = require('../helper/getGroups');

router.get('/:user', async (req, res) => {
  let { user } = req.params;
  if (!user) res.status(400).send('Invalid parameter value');
  getGroups(res, user);
});

module.exports = router;
