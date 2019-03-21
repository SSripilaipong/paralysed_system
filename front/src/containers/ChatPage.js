import React, { Component } from "react";
import "./ChatPage.css";
import MessageList from "../components/Messagelist";
import SendMessageForm from "../components/SendMessageForm";
import RoomList from "../components/Roomlist";
import NewRoomForm from "../components/NewRoomForm";

class ChatPage extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      temp: [],
      rooms: [],
      roomId: null,
      userId: "toey",
      scroll: false,
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
        { senderId: this.state.userId, text: text, time: "11:00" }
      ],
      scroll: !this.state.scroll
    });
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
    console.log(name);
    this.setState({
      rooms: [...this.state.rooms, name]
    });
  }

  enterRoom(name) {
    this.setState({
      roomId: name
    });
  }
  render() {
    return (
      <div className="chat">
        <RoomList rooms={[...this.state.rooms]} enterRoom={this.enterRoom} joinRoom={this.joinRoom}/>
        <MessageList
          messages={this.state.messages}
          userId={this.state.userId}
          scroll={this.state.scroll}
        />
        <SendMessageForm sendMessage={this.sendMessage} />
        <NewRoomForm createRoom={this.createRoom} />
      </div>
    );
  }
}

export default ChatPage;
