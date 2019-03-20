import React from "react";

function Message(props) {
  return (
    <div style={{ width: "100%" }}>
      <div
        className="message"
        style={{
          textAlign: props.userId === "toey" ? "right" : "left",
          clear: "both"
        }}
      >
        <div style={{ float: props.userId === "toey" ? "left" : "right" }}>
          <div className="userId">{props.userId}</div>
          <div className="text">{props.text}</div>
          <div
            className="messageTime"
            style={{ float: props.userId === "toey" ? "left" : "right" }}
          >
            {props.time}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
