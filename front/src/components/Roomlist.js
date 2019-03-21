import React from "react";
import { Button } from "react-bootstrap";
class Roomlist extends React.Component {
  render() {
    return (
      <div className="roomlist">
        <ui>
          <h3>ROOMS</h3>
          {this.props.rooms.map(room => {
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
                >
                  <a className="roomName">{room.gname}</a>
                </div>
                <Button
                  href="#"
                  onClick={() => this.props.joinRoom(room.gid)}
                  style={{ display: room.isJoined ? "none" : "" }}
                >
                  Join
                </Button>
                <Button
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
    );
  }
}

export default Roomlist;
