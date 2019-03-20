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
            paddingRight: "20px",
            paddingLeft: "10px"
          }}
        >
          {this.props.messages.map((message, index) => {
            return (
              <Message
                key={index}
                userId={this.props.userId}
                text={message.text}
                time={message.time}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default MessageList;
