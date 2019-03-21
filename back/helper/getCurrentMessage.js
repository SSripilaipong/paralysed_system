const { Message, validate } = require('../models/message');

async function getCurrentMessage(gid, userId, message) {
  let currentMessage = new Message({
    groupId: gid,
    body: message,
    author: userId
  });
  const { error } = validate(currentMessage);
  if (error) console.log(error);
  try {
    currentMessage = await currentMessage.save();
    return currentMessage;
  } catch (e) {
    return undefined;
  }
}

module.exports = getCurrentMessage;
