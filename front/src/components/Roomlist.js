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
              <div
                className="room"
                onClick={() => this.props.enterRoom(room.name)}
              >
                <a className="roomName">{room.name}</a>
                <Button href="#">Join</Button>
              </div>
            );
          })}
        </ui>
      </div>
    );
  }
}

export default Roomlist;
