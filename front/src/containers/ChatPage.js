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
      scroll: false
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.addunreadMessage = this.addunreadMessage.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.enterRoom = this.enterRoom.bind(this);
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
  createRoom(name) {
    this.setState({
      rooms: [...this.state.rooms, { name: name, messages: [] }]
    });
  }

  enterRoom(name) {
    this.state.rooms.map(room => {
      if (room.name === name) {
        this.setState({
          roomId: room.name,
          messages: room.messages
        });
      }
    });
  }
  render() {
    return (
      <div className="chat">
        <RoomList
          rooms={this.state.rooms}
          enterRoom={this.enterRoom}
          joinRoom={this.joinRoom}
        />
        <MessageList
          messages={this.state.messages}
          userName={this.state.userName}
          userId={this.state.userId}
          scroll={this.state.scroll}
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
