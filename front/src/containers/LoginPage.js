import React, { Component } from "react";
import "./LoginPage.css";
import axios from "axios";
import {
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Form
} from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import { fail } from "assert";
import API_URL from "../config";

class LoginPage extends Component {
  state = {
    user: "",
    password: ""
  };
  
  loginHandler = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    this.setState({ validated: true });
    const data = {
      user: this.state.user,
      password: this.state.password
    };
    if (form.checkValidity()) {
      axios
        .post(API_URL + "/api/login", data, {
          headers: { "Content-type": "application/json" }
        })
        .then(res => {
          console.log(res.data);
          alert("Login success with username: " + res.data.user );

          window.localStorage.setItem("userName", res.data.user);
          window.localStorage.setItem("userId", res.data._id);
          window.location = "/chat";
        })
        .catch(e => {
          this.setState({
            faillogin: true
          });
        });
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    const { validated } = this.state;
    return (
      <div className="Login">
        <Form onSubmit={this.loginHandler} noValidate validated={validated}>
          <p className="center_text">MEMBER LOGIN</p>
          <FormGroup controlId="user" size="large">
            <FormLabel>Username</FormLabel>
            <FormControl
              required
              autoFocus
              type="username"
              value={this.state.user}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" size="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              required
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          {this.state.faillogin && (
            <span className="errorMessage">{this.state.failmessage}</span>
          )}
          <Button
            block
            variant="danger"
            size="large"
            style={{ width: "40%", margin: "0 auto" }}
            // disabled={!this.validateForm()}
            type="submit"
            onClick={this.loginHandler}
          >
            Login
          </Button>

          <a href="regis">Register</a>
        </Form>
      </div>
    );
  }
}

export default withRouter(LoginPage);
