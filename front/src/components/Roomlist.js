import React from "react";

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
                  herf="#"
                  onClick={() => this.props.enterRoom(room)}
                >
                  {room}
                </a>
              </li>
            );
          })}
        </ui>
      </div>
    );
  }
}

export default Roomlist;
