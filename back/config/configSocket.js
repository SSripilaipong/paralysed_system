const socketIO = require("socket.io");

const subscribeGroup = (socket,data) => {

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
      socket.emit("new-message", message);
    });
  });
};
