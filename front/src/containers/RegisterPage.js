import React, { Component } from 'react';
import { Button, Form, Row, Col, FormGroup,Modal } from "react-bootstrap";
class RegisterPage extends Component {
  render() {
    return (
      <div>
        <h1>Register</h1>
        <div>
            <label>Name</label>
            <input></input>
        </div>
        <div>
            <label>ID</label>
            <input></input>
        </div>
        <div>
            <label>Password</label>
            <input></input>
        </div>
        <div>
            <label>Confirm-Password</label>
            <input></input>
        </div>
        <div>
            <Button>confirm</Button>
        </div>
      </div>
    )
  }
}

export default RegisterPage;