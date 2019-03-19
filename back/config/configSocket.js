const socketIO = require("socket.io");

const subscribeGroup = (socket,data) => {
    const {gid} = data;
    socket.join(gid);
    console.log("subscribed")
    //get unread message
}

module.exports = server => {
  const io = socketIO(server);

  io.on("connection", socket => {
    console.log("user connected");

    socket.on("subscribe group", data =>{
        subscribeGroup(socket,data);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("sent-message", data => {
      //get time
      const { gid, user, message } = data;
      console.log(message);
      socket.to(gid).emit("new-message", message);
      console.log("emited")
    });
  });
};
