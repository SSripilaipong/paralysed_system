import React from "react";
import { Button } from "react-bootstrap";

class Roomlist extends React.Component {
  render() {
    return (
      <div
        className="roomlist"
        style={{ display: this.props.list === 0 ? "" : "none" }}
      >
        <div
          style={{ height: "100%", overflowY: "scroll", marginRight: "-27px" }}
        >
          <ui>
            {this.props.rooms.map(room => {
              let item = (
                <a className="roomName" style={{ color: "black" }}>
                  {room.gname}
                </a>
              );
              if (room.gid == this.props.roomid) {
                item = (
                  <a className="roomName" style={{ color: "white" }}>
                    {room.gname}
                  </a>
                );
              }
              return (
                <div className="room">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%"
                    }}
                    onClick={() => this.props.enterRoom(room.gid)}
                    style={{ display: room.isJoined ? "" : "none" }}
                  >
                    {item}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%"
                    }}
                    style={{ display: room.isJoined ? "none" : "" }}
                  >
                    <h10 style={{ color: "rgb(72,72,72)" }}>{room.gname}</h10>
                  </div>
                  <Button
                    size="sm"
                    href="#"
                    onClick={() => this.props.joinRoom(room.gid)}
                    style={{ display: room.isJoined ? "none" : "" }}
                  >
                    Join
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    href="#"
                    onClick={() => this.props.leaveRoom(room.gid)}
                    style={{ display: room.isJoined ? "" : "none" }}
                  >
                    Leave
                  </Button>
                </div>
              );
            })}
          </ui>
        </div>
      </div>
    );
  }
}

export default Roomlist;
