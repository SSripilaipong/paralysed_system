import React, { Component } from 'react';
import { Button, Form, Row, Col, FormGroup,Modal,FormControl,FormLabel } from "react-bootstrap";
import axios from "axios";
import { Link } from 'react-router-dom'
import "./RegisterPage.css"
class RegisterPage extends Component {
  state = {
    name: "",
    id:"",
    password: "",
    confirm:"",
    validated: false,
    faillogin: false,
  };
  submitHandler = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    this.setState({ validated: true });
    const data = { ...this.state };
    if (form.checkValidity()) {
      axios
        .post("/auth/login", data)
        .then(res => {
          console.log(res.user);
          window.location = "/";
        })
        .catch(e => {
          this.setState({
            faillogin: true
          });
        }); // Handle Login failed
    }
  };
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    return (
      <div className = "wrapper">
        <div>
          <h3>Register</h3>
        </div>
        <div>
            <FormGroup controlId="username" size="large">
            <FormLabel>Name</FormLabel>
            <FormControl
              required
              autoFocus
              type="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
             </FormGroup>
        </div>
        <div>
            <FormGroup controlId="id" size="large">
            <FormLabel>id</FormLabel>
            <FormControl
              required
              autoFocus
              type="id"
              value={this.state.id}
              onChange={this.handleChange}
            />
             </FormGroup>
        </div>
        <div>
            <FormGroup controlId="password" size="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              required
              autoFocus
              type="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
             </FormGroup>
        </div>
        <div>
          <FormGroup controlId="confirm" size="large">
            <FormLabel>Confirm-Password</FormLabel>
            <FormControl
              required
              autoFocus
              type="Password"
              value={this.state.confirm}
              onChange={this.handleChange}
            />
             </FormGroup>
        </div>
        <div className = "buttonwrapper">
            <Button variant="danger" className = "buttonwrapper" href="/">Back</Button>
            <Button  className = "buttonwrapper" href="/">Confirm</Button>
        </div>
      </div>
    )
  }
}

export default RegisterPage;