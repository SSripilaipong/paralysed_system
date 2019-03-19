const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { gname, user } = req.body;
  if (!gname || !user) res.status(400).send("Invalid parameter value");
});

module.exports = router;
