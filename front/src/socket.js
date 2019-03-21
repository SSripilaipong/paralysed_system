const io = require( "socket.io-client");

const socket1 = io("http://localhost:8000/");
const socket2 = io("http://localhost:8000/");
const socket3 = io("http://localhost:8000/");

socket1.on('connect', async () => {
    await console.log("socket1 bef",socket1.connected); // 'G5p5...'
    socket1.on("respone",(data)=>{
        console.log(data)
    })
    await socket1.disconnect();
    await console.log("socket1 aft",socket1.connected);
  });
// socket1.disconnected();
// socket1.on('connect', () => { 
//     console.log(socket1.id); // 'G5p5...'
//   });
socket2.on('connect', async() => { 
    await console.log(socket2.id); // 'G5p5...'
    await socket2.emit("enter-group",{gid:"5c91e7d545ff9b0a704d652f"})
    socket2.on("respone",(data)=>{
        console.log(data)
    })
    await socket2.emit("sent-message",{ 
        gid: "5c91e7d545ff9b0a704d652f",
        userObj: {
          _id: "5c91dc94778ad145880f7986", 
          user: "kuy12345"
        },
        message: "this is message from socket.js"
      })
    // console.log("socket2",socket2.rooms)
  });
console.log("socket3",socket3.connected)
