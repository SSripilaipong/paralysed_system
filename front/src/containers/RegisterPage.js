import React, { Component } from "react";
import API_URL from "../config";
import {
  Button,
  Form,
  Row,
  Col,
  FormGroup,
  Modal,
  FormControl,
  FormLabel
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

class RegisterPage extends Component {
  state = {
    user: "",
    password: "",
    confirm: "",
    validated: false,
    faillogin: false
  };

  submitHandler = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    this.setState({ validated: true });
    const data = { user: this.state.user, password: this.state.password };
    axios
      .post(API_URL + "/api/register", data, {
        headers: { "Content-type": "application/json" }
      })
      .then(res => {
        console.log(res.user);
        window.location = "/";
      })
      .catch(e => {
        this.setState({
          faillogin: true
        });
      }); // Handle Login failed
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    return (
      <div className="wrapper">
        <div>
          <h3>Register</h3>
        </div>
        <div>
          <FormGroup controlId="user" size="large">
            <FormLabel>Name</FormLabel>
            <FormControl
              required
              autoFocus
              type="username"
              value={this.state.user}
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
        <div className="buttonwrapper">
          <Button variant="danger" className="buttonwrapper" href="/">
            Back
          </Button>
          <Button className="buttonwrapper" onClick={this.submitHandler}>
            Confirm
          </Button>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
