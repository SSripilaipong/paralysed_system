const Message = require('../models/message');

async function getCurrentMessage(gid, user, message) {
  let currentMessage = new Message({
    groupId: gid,
    body: message,
    author: user
  });
  try {
    currentMessage = await currentMessage.save();
    return currentMessage;
  } catch (e) {
    return undefined;
  }
}

module.exports = getCurrentMessage;
