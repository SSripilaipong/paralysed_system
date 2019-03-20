const { Group } = require('../models/group');
const { User } = require('../models/user');

async function getGroups(res, user) {
  const userId = (await User.findOne({ user }))._id;

  if (!userId) return undefined;

  await Group.find({}, null, { sort: { _id: 1 } }, (err, groups) => {
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
    res.send({ groups: result });
  });
}

module.exports = getGroups;
