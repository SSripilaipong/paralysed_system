import React from "react";
function Message(props) {
  return (
    <div style={{ width: "100%" }}>
      <div className={props.userId === "toey" ? "ourmessage" : "othermessage"}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start"
          }}
        >
          <div className="userId">{props.userId}</div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end"
            }}
          >
            <div className={props.userId === "toey" ? "ourtext" : "othertext"}>
              {props.text}
            </div>
            <div className="messageTime">{props.time}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
