import React from "react";
import manicon from "./manicon.png";
import exiticon from "./exiticon.png";
import chaticon from "./chaticon.png";

class Tabbar extends React.Component {
  render() {
    return (
      <div className="tabbar">
        <img
          src={manicon}
          style={{
            width: "17px",
            height: "19px",
            marginTop: "33px",
            filter: this.props.list === 1 ? "brightness(2.4)" : ""
          }}
          onClick={() => this.props.switchlist(1)}
        />
        <img
          src={chaticon}
          style={{
            width: "18px",
            height: "18px",
            marginTop: "34px",
            filter: this.props.list === 0 ? "brightness(2.4)" : ""
          }}
          onClick={() => this.props.switchlist(0)}
        />
        <div className="exiticon" style={{ marginTop: "auto" }}>
          <img
            src={exiticon}
            style={{
              width: "25px",
              height: "25px",
              marginTop: "auto",
              marginBottom: "33px"
            }}
            onClick={() => this.props.logout()}
          />
        </div>
      </div>
    );
  }
}

export default Tabbar;
