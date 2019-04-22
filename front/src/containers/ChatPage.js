import React, { Component } from "react";
import "./ChatPage.css";
import MessageList from "../components/Messagelist";
import SendMessageForm from "../components/SendMessageForm";
import Tabbar from "../components/Tabbar";
import RoomList from "../components/Roomlist";
import Userlist from "../components/Userlist";
import NewRoomForm from "../components/NewRoomForm";
import axios from "axios";
import io from "socket.io-client";
import API_URL from "../config";

class ChatPage extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      temp: [],
      rooms: [],
      roomId: null,
      userName: window.localStorage.getItem("userName"),
      userId: window.localStorage.getItem("userId"),
      scroll: false,
      lastmessageIdLastTime: "",
      lastmessageId: "",
      isLoading: false,
      list: 0
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.addunreadMessage = this.addunreadMessage.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.enterRoom = this.enterRoom.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
    this.switchlist = this.switchlist.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.getRoomlist();
  }

  getRoomlist() {
    axios.get(`${API_URL}/api/groups/${this.state.userName}`).then(res => {
      const { groups } = res.data;
      this.setState({ rooms: [...groups.joined, ...groups.notJoined] }, () =>
        console.log(this.state.rooms)
      );
    });
  }

  sendMessage = message => {
    const { roomId, userId, userName } = this.state;
    this.state.socket.emit("sent-message", {
      gid: roomId,
      userObj: { _id: userId, user: userName },
      message: message
    });
    this.setState({ scroll: !this.state.scroll });
  };

  addunreadMessage() {
    this.setState({
      messages: [
        ...this.state.messages,
        { senderId: -1, text: "unread messages", time: "" }
      ]
    });
  }

  removeunreadMessage() {
    this.setState({
      temp: []
    });
    this.state.messages.map(message => {
      if (message.senderId !== -1) {
        this.setState({
          temp: [...this.state.temp, message]
        });
      }
    });
    this.setState({
      messages: this.state.temp
    });
  }

  createRoom(roomname) {
    axios
      .post(
        API_URL + "/api/create-group",
        { name: roomname, user: this.state.userName },
        {
          headers: { "Content-type": "application/json" }
        }
      )
      .then(res => {
        this.getRoomlist();
      });
  }

  joinRoom(roomgid) {
    const { userName } = this.state;
    this.setState({ isLoading: true });
    axios
      .post(
        API_URL + "/api/join",
        { gid: roomgid, user: userName },
        {
          headers: { "Content-type": "application/json" }
        }
      )
      .then(res => {
        this.getRoomlist();
      });
  }

  leaveRoom(roomgid) {
    axios
      .post(
        API_URL + "/api/leave",
        { gid: roomgid, user: this.state.userName },
        {
          headers: { "Content-type": "application/json" }
        }
      )
      .then(res => {
        this.getRoomlist();
      });
  }

  recieveMessages = async data => {
    const messages = JSON.parse(data);
    console.log(
      "messages from receive message",
      messages,
      messages[messages.length - 1]
    );
    this.setState({
      messages: messages,
      lastmessageId: messages.length > 0 ? messages[messages.length - 1]._id : 0
    });
  };

  recieveMessage = data => {
    const message = JSON.parse(data);
    console.log(message);
    this.setState({
      messages: [...this.state.messages, message],
      lastmessageId: message._id
    });
  };

  async connectSocket() {
    const socket = this.state.socket;
    socket.on("connect", async () => {
      await socket.emit("enter-group", { gid: this.state.roomId });
      socket.on("respone", this.recieveMessages);
      socket.on("new-message", this.recieveMessage);
    });
  }

  enterRoom(roomname) {
    window.localStorage.setItem(
      "lastmessageId." + this.state.roomId,
      this.state.lastmessageId
    );

    let previousSocket = this.state.socket;
    if (previousSocket) {
      previousSocket.disconnect();
    }
    let socket = io(API_URL);
    this.setState(
      {
        socket: socket,
        roomId: roomname,
        lastmessageIdLastTime: window.localStorage.getItem(
          "lastmessageId." + roomname
        )
      },
      this.connectSocket
    );
  }
  switchlist(listnum) {
    this.setState({
      list: listnum
    });
    console.log(this.state.list);
  }
  logout() {
    console.log("logout");
  }
  render() {
    return (
      <div className="chat">
        <Tabbar
          switchlist={this.switchlist}
          logout={this.logout}
          list={this.state.list}
        />
        <RoomList
          rooms={this.state.rooms}
          enterRoom={this.enterRoom}
          joinRoom={this.joinRoom}
          leaveRoom={this.leaveRoom}
          roomid={this.state.roomId}
          list={this.state.list}
        />
        <Userlist rooms={this.state.rooms} list={this.state.list} />
        <MessageList
          messages={this.state.messages}
          userName={this.state.userName}
          userId={this.state.userId}
          scroll={this.state.scroll}
          lastmessageIdLastTime={this.state.lastmessageIdLastTime}
          lastmessageId={this.state.lastmessageId}
        />
        <SendMessageForm
          sendMessage={this.sendMessage}
          roomId={this.state.roomId}
        />
        <NewRoomForm createRoom={this.createRoom} />
      </div>
    );
  }
}

export default ChatPage;
