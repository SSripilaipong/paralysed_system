const { Message } = require("../models/message");

async function getMessages(gid) {
  try {
    const messages = await Message.find({ groupId: gid }, null, {
      sort: { _id: 1 }
    });
    return messages;
  } catch (e) {
    return undefined;
  }
}

module.exports = getMessages;
