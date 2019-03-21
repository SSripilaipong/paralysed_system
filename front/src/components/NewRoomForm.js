import React from "react";

class NewRoomForm extends React.Component {
  constructor() {
    super();
    this.state = {
      roomName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      roomName: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createRoom(this.state.roomName);
    this.setState({
      roomName: ""
    });
  }

  render() {
    return (
      <div className="newRoomForm">
        <form onSubmit={this.handleSubmit} className="createRoom">
          <input
            value={this.state.roomName}
            onChange={this.handleChange}
            placeholder="newRoomForm"
            required
            type="text"
          />
          <button id="createroombtn" type="submit">
            +
          </button>
        </form>
      </div>
    );
  }
}
export default NewRoomForm;
