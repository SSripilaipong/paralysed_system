const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { seq_num, gid, user } = req.body;
  if (!seq_num || !gid || !user)
    res.status(400).send("Invalid parameter value");
});

module.exports = router;
