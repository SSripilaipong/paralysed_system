const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { gid, user } = req.body;
  if (!gid || !user) res.status(400).send("Invalid parameter value");
});

module.exports = router;
