import React from "react";
function Message(props) {
  let textClassName = "";
  let messageClassName = "";
  if (props.senderId === -1) {
    textClassName = "unreadtext";
  } else if (props.userId === props.senderId) {
    textClassName = "ourtext";
  } else if (props.userId !== props.senderId && props.senderId !== -1) {
    textClassName = "othertext";
  }
  if (props.senderId === -1) {
    messageClassName = "unreadmessage";
  }
  if (props.userId === props.senderId) {
    messageClassName = "ourmessage";
  } else if (props.userId !== props.senderId && props.senderId !== -1) {
    messageClassName = "othermessage";
  }
  return (
    <div style={{ width: "100%" }}>
      <div className={messageClassName}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start"
          }}
        >
          <div
            className="senderId"
            style={{ display: props.senderId === -1 ? "none" : "" }}
          >
            {props.senderName}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <div className={textClassName}>{props.text}</div>
            <div className="messageTime">{props.time}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
