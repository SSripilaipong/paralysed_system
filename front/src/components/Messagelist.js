import React from "react";
import Message from "./Message";
import ReactDOM from "react-dom";

class MessageList extends React.Component {
  constructor() {
    super();
    this.state = {
      scroll: true
    };
    this.submitMessage = this.submitMessage.bind(this);
  }
  submitMessage() {
    this.setState({
      scroll: this.props.scroll
    });
  }
  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollToBottom =
      node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
  }
  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
    if (this.state.scroll != this.props.scroll) {
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
      this.submitMessage();
    }
  }

  render() {
    return (
      <div className="massagelist">
        <div
          style={{
            display: this.props.roomId !== null ? "none" : "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
          }}
        >
          <h3 style={{ color: "#8A8D8A" }}>Start You Conversation !!!</h3>
        </div>
        <div
          style={{
            paddingRight: "20px",
            paddingLeft: "10px"
          }}
        >
          {this.props.messages.map((message, index) => {
            if (message._id === this.props.lastmessageIdLastTime) {
              return (
                <div>
                  <Message
                    key={index}
                    userId={this.props.userId}
                    text={message.body}
                    time={message.time}
                    senderId={message.senderId}
                    senderName={message.senderName}
                  />
                  <Message
                    key={index}
                    userId={this.props.userId}
                    text="new messages"
                    time={message.time}
                    senderId={-1}
                    senderName={message.senderName}
                  />
                </div>
              );
            } else {
              return (
                <Message
                  key={index}
                  userId={this.props.userId}
                  text={message.body}
                  time={message.time}
                  senderId={message.senderId}
                  senderName={message.senderName}
                />
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default MessageList;
