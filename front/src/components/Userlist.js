import React from "react";
import { Button } from "react-bootstrap";

class Userlist extends React.Component {
  render() {
    return (
      <div
        className="userlist"
        style={{ display: this.props.list === 1 ? "" : "none" }}
      >
        <div
          style={{ height: "100%", overflowY: "scroll", marginRight: "-27px" }}
        >
          <p>USERXXXXXXX</p>
          {this.props.rooms.map(room => {
            let item = (
              <p className="roomName" style={{ color: "black" }}>
                {room.gname}
              </p>
            );
            return (
              <div className="user">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%"
                  }}
                >
                  {item}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Userlist;
