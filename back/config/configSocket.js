const socketIO = require("socket.io");
const getCurrentMessage = require("../helper/getCurrentMessage");
const getMessages = require("../helper/getMessages");

const enterGroup = async (socket, data) => {
  const { gid } = data;
  socket.join(gid);
  console.log(socket.id, "entered group " + gid);

  const messages = await getMessages(gid);
  socket.emit("respone", JSON.stringify(messages));
};

module.exports = server => {
  const io = socketIO(server);

  io.on("connection", socket => {
    console.log(socket.id, "user connected");

    socket.on("enter-group", data => {
      enterGroup(socket, data);
    });

    socket.on("disconnect", () => {
      console.log(socket.id, "user disconnected");
    });

    socket.on("sent-message", async data => {
      // console.log(data)
      const { gid, userObj, message } = data;
      const currentMessage = await getCurrentMessage(gid, userObj, message);
      if (currentMessage) {
        io.in(gid).emit("new-message", JSON.stringify(currentMessage));
        console.log("emited");
      } else {
        console.log("Get current message fails");
      }
    });
  });
};
