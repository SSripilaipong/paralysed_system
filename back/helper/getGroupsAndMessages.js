const { Group } = require('../models/group');
const { User } = require('../models/user');
const { Message } = require('../models/message');

async function getGroupsAndMessages(res, user, gid) {
  const userId = (await User.findOne({ user }))._id;

  if (!userId) return undefined;
  await Group.find({}, null, { sort: { _id: 1 } }, async (err, groups) => {
    if (err) return undefined;
    let result = [];
    groups.forEach(group => {
      if (
        group.participants.find(
          element => element.toString() === userId.toString()
        )
      )
        result.push({
          gid: group._id,
          gname: group.name,
          isJoined: true
        });
      else
        result.push({
          gid: group._id,
          gname: group.name,
          isJoined: false
        });
    });
    const messages = await Message.find({ groupId: gid }, null, {
      sort: { _id: -1 }
    });
    res.send({ groups: result, messages });
  });
}

module.exports = getGroupsAndMessages;
