const express = require("express");
const router = express.Router();
const getMessages = require("../helper/getMessages");

router.get("/:groupId", async (req, res) => {
  const gid = req.params.groupId;
  console.log(gid);
  const messages = await getMessages(gid);
  console.log(messages);
  res.send(messages);
});

module.exports = router;
