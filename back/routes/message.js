const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { seq_num, gid, user } = req.body;
  if (!gid || !user) res.status(400).send("Invalid parameter value");
  if (!seq_num) {
    // get all or ignore
  }
});

module.exports = router;
