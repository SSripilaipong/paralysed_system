const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const { user } = req.query;
  if (!user) res.status(400).send("Invalid parameter value");
});

module.exports = router;
