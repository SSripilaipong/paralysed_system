const { Group } = require('../models/group');
const { User } = require('../models/user');

async function getGroups(user) {
  const userId = (await User.findOne({ user }))._id;

  if (!userId) return undefined;

  try {
    const groups = await Group.find({}, null, { sort: { _id: -1 } });
    let joined = [],
      notJoined = [];
    groups.forEach(group => {
      if (
        group.participants.find(
          element => element.toString() === userId.toString()
        )
      )
        joined.push({
          gid: group._id,
          gname: group.name,
          isJoined: true
        });
      else
        notJoined.push({
          gid: group._id,
          gname: group.name,
          isJoined: false
        });
    });
    return {
      joined,
      notJoined
    };
  } catch (e) {
    return undefined;
  }
}

module.exports = getGroups;
