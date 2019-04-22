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
            height: "100%",
            marginRight: "-15px",
            overflowY: "scroll"
          }}
        >
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
            {this.props.messages.map(message => {
              console.log("messages from render", typeof message.userId);
              if (message._id === this.props.lastmessageIdLastTime) {
                return (
                  <div>
                    <Message
                      key={message._id}
                      userId={this.props.userId}
                      text={message.body}
                      time={message.createdAt}
                      senderId={message.userId}
                      senderName={message.user}
                    />
                    <Message
                      key={message._id}
                      userId={this.props.userId}
                      text="new messages"
                      time={message.createdAt}
                      senderId={-1}
                      senderName={message.user}
                    />
                  </div>
                );
              } else {
                return (
                  <Message
                    key={message._id}
                    userId={this.props.userId}
                    text={message.body}
                    time={message.createdAt}
                    senderId={message.userId}
                    senderName={message.user}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default MessageList;
