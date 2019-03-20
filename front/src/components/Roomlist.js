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
              <li>
                <a
                  className="room"
                  href="#"
                  onClick={() => this.props.enterRoom(room)}
                >
                  {room}
                </a>
                <Button href="#">Join</Button>
              </li>
            );
          })}
        </ui>
      </div>
    );
  }
}

export default Roomlist;
