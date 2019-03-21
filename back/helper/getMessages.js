const { Message } = require('../models/message');

async function getMessages(gid) {
  try {
    const messages = await Message.find({ groupId: gid }, null, {
      sort: { _id: -1 }
    });
    console.log(messages);
    return messages;
  } catch (e) {
    return undefined;
  }
}

module.exports = getMessages;
