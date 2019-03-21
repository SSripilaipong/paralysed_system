import io from "socket.io-client";
import React, { Component } from "react";

const serverUrl = "http://localhost:8000/";

class Chating extends Component {

  constructor() {
    super();
    this.myRef = React.createRef();
    this.state = {
      socket: null,
      roomId: null,
      messages: [],
      userId: "5c91e83145ff9b0a704d6532",
      userName: "fudgy12345",
      message: ""
    };
  }

  onChange = (event) =>{
    this.setState({message:event.target.value})
  }
  enterGroup = async event => {
    let previousSocket = this.state.socket;
    if (previousSocket) {
      previousSocket.disconnect();
    }
    let socket = io(serverUrl);
    await this.setState({ socket: socket, roomId: event.target.id });
    socket.on("connect", async () => {
      await socket.emit("enter-group", { gid: this.state.roomId });
      socket.on("respone", async data => {
        this.setState({ messages: JSON.parse(data) });
      });
      socket.on("new-message", data => {
        console.log(JSON.parse(data))
        let messages = this.state.messages;
        messages.unshift(JSON.parse(data))
        console.log(messages)
        this.setState({messages:messages})
      });
    });
  };

  sendMessage = () => {
    const { roomId, userId, userName } = this.state;
    this.state.socket.emit("sent-message", {
      gid: roomId,
      userObj: { _id: userId, user: userName },
      message: this.state.message
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          id="5c91e7df45ff9b0a704d6531"
          onClick={this.enterGroup}
        >
          group_D
        </button>
        <button
          type="button"
          className="btn btn-primary"
          id="5c91e7d545ff9b0a704d652f"
          onClick={this.enterGroup}
        >
          group_B
        </button>
        {this.state.roomId ? (
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="type here"
              onChange = {this.onChange}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <button
              type="button"
              className="btn btn-primary"
              id={this.state.roomId}
              onClick={this.sendMessage}
            >
              sendMessage
            </button>
          </div>
        ) : null}
        {this.state.messages.map(message => (
          <p key={message._id}>{JSON.stringify(message)}</p>
        ))}
      </div>
    );
  }
}

export default Chating;
