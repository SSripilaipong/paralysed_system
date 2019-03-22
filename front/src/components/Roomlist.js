import React from "react";
import { Button } from "react-bootstrap";
class Roomlist extends React.Component {
  render() {
    return (
      <div className="roomlist">
        <ui>
          <h3>ROOMS</h3>
          {this.props.rooms.map(room => {
            let item = (<a className="roomName" style={{color: "red"}}>{room.gname}</a>);
            if(room.gid==this.props.roomid){
              item = (<a className="roomName" style={{color: "green"}}>{room.gname}</a>);
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
                  style={{display: room.isJoined ? "" : "none"}}
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
                  style={{display: room.isJoined ? "none" : ""}}
                >
                  <h8>{room.gname}</h8>
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
    );
  }
}

export default Roomlist;
