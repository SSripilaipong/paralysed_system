import io from "socket.io-client";
import React, { Component } from "react";

class Messaging extends Component {
  constructor() {
    super();
    this.state = {
      socket: null,
      selectedGid: null
    };
  }
}

export default Messaging;