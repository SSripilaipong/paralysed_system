import React, { Component } from 'react';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';
import './ChatPage.css';


class ChatPage extends Component {
  state = {
    newMessage: "",
    responseMessage:"Welcome to this awesome chat!",
  };
  componentDidMount() {
    addResponseMessage(this.state.responseMessage);
    
  }

  handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage} `);
    // Now send the message throught the backend API
  }

  render() {
    return (
      <div className="chat">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          title="ChatBOX"
          subtitle="type chat here"
        />
      </div>
    );
  } 
}

export default ChatPage;