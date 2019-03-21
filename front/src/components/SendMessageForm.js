import React from "react";
import axios from "axios";
class SendMessageForm extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "",
      failmessage: false
    };
    this.handlerChange = this.handlerChange.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
  }

  handlerChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  handlerSubmit(e) {
    e.preventDefault();
    if (this.state.message) {
      this.props.sendMessage(this.state.message);
      this.setState({
        message: ""
      });
    }
    const data = { ...this.state };
    axios
      .post("/api/message", data)
      .then(res => {
        console.log(res.user);
      })
      .catch(e => {
        this.setState({
          failmessage: true
        });
      }); // Handle Login failed
  }

  render() {
    return (
      <form onSubmit={this.handlerSubmit} className="sendMessage">
        <input
          onChange={this.handlerChange}
          value={this.state.message}
          placeholder="Type your message and Enter"
          type="text"
          style={{ display: this.props.roomId === null ? "none" : "" }}
        />
      </form>
    );
  }
}

export default SendMessageForm;
