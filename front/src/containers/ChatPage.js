import React, { Component } from "react";
import "./ChatPage.css";
import MessageList from "../components/Messagelist";
import SendMessageForm from "../components/SendMessageForm";
import RoomList from "../components/Roomlist";
import NewRoomForm from "../components/NewRoomForm";
import axios from "axios";
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
      lastmessageId: ""
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.addunreadMessage = this.addunreadMessage.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.enterRoom = this.enterRoom.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
  }

  componentDidMount() {
    this.getRoomlist();
  }

  getRoomlist() {
    axios
      .get(`http://localhost:8000/api/groups/${this.state.userName}`)
      .then(res => {
        const { groups } = res.data;
        this.setState({ rooms: [...groups.joined, ...groups.notJoined] }, () =>
          console.log(this.state.rooms)
        );
      });
  }

  sendMessage(text) {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          senderName: this.state.userName,
          senderId: this.state.userId,
          text: text,
          time: "11:00"
        }
      ],
      scroll: !this.state.scroll
    });
    console.log(this.state.userName);
  }

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

  recieveMessages(messages) {
    this.setState({
      messages: messages,
      lastmessageId: messages[messages.length - 1]._id
    });
  }

  recieveMessage(message) {
    this.setState({
      messages: [...this.state.messages, message],
      lastmessageId: message._id
    });
  }

  createRoom(roomname) {
    axios
      .post(
        "http://localhost:8000/api/create-group",
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
    axios
      .post(
        "http://localhost:8000/api/join",
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
        "http://localhost:8000/api/leave",
        { gid: roomgid, user: this.state.userName },
        {
          headers: { "Content-type": "application/json" }
        }
      )
      .then(res => {
        this.getRoomlist();
      });
  }
  enterRoom(roomname) {
    window.localStorage.setItem(
      "lastmessageId." + this.state.roomId,
      this.state.lastmessageId
    );

    this.setState({
      roomId: roomname,
      lastmessageIdLastTime: window.localStorage.getItem(
        "lastmessageId." + roomname
      )
    });
    let groupId = "5c91e7df45ff9b0a704d6531";
    axios
      .get(
        "http://localhost:8000/api/message/" + groupId,

        {
          headers: { "Content-type": "application/json" }
        }
      )
      .then(res => {
        console.log(res.data);
        this.recieveMessages(res.data);
      });
  }
  render() {
    return (
      <div className="chat">
        <RoomList
          rooms={this.state.rooms}
          enterRoom={this.enterRoom}
          joinRoom={this.joinRoom}
          leaveRoom={this.leaveRoom}
        />
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
