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
      rooms: [],
      roomId: null,
      userId: "toey",
      scroll: false
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.enterRoom = this.enterRoom.bind(this);
  }

  sendMessage(text) {
    this.setState({
      messages: [...this.state.messages, { text: text, time: "11:00" }],
      scroll: !this.state.scroll
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
        <RoomList rooms={[...this.state.rooms]} enterRoom={this.enterRoom} />
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
