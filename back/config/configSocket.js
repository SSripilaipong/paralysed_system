const socketIO = require('socket.io');
const getMessages = require('../helper/getMessages');
const getCurrentMessage = require('../helper/getCurrentMessage');

const subscribeGroup = async (socket, data) => {
  const { gid } = data;
  socket.join(gid);
  console.log('subscribed');
  // get messages
  const messages = await getMessages(gid);
};

module.exports = server => {
  const io = socketIO(server);

  io.on('connection', socket => {
    console.log('user connected');

    socket.on('subscribe group', data => {
      subscribeGroup(socket, data);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('sent-message', async data => {
      //get time
      const { gid, user, message } = data;
      const currentMessage = await getCurrentMessage(gid, user, message);
      if (currentMessage) {
        console.log(currentMessage);
        socket.to(gid).emit('new-message', message);
        console.log('emited');
      } else {
        console.log('Get current message fails');
      }
    });
  });
};
