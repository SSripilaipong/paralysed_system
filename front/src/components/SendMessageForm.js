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
        <div
          style={{
            overflowY: "scroll",
            maxWidth: "100%",
            minWidth: "100%"
          }}
        >
          <input
            onChange={this.handlerChange}
            value={this.state.message}
            placeholder="Type your message and Enter"
            type="text"
            style={{ display: this.props.roomId === null ? "none" : "" }}
          />
        </div>
      </form>
    );
  }
}

export default SendMessageForm;
