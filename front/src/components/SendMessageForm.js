import React from "react";

class SendMessageForm extends React.Component {
  constructor() {
    super();
    this.state = {
      message: ""
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
