const { Message, validate } = require('../models/message');

async function getCurrentMessage(gid, userObj, message) {
  const { _id, user } = userObj;
  console.log('_id', _id);
  console.log('user', user);
  let currentMessage = new Message({
    groupId: gid,
    body: message,
    userId: _id,
    user
  });

  try {
    currentMessage = await currentMessage.save();
    console.log(currentMessage)
    return currentMessage;
  } catch (e) {
    return undefined;
  }
}

module.exports = getCurrentMessage;
