import io from "socket.io-client";
import React, { Component } from "react";

const serverUrl = "http://localhost:8000/";

class Chating extends Component {
  constructor() {
    super();
    this.state = {
      socket: null,
      selectedGid: null
    };
  }
  
  enterGroup = event => {
    let previousSocket = this.state.socket;
    if (previousSocket) {
      previousSocket.disconnect();
    }
    let socket = io(serverUrl);
    this.setState({ socket: socket, selectedGid: event.target.id });
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
      </div>
    );
  }
}

export default Chating;
