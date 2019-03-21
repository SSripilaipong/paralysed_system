import React, { Component } from "react";
import "./LoginPage.css"
import axios from "axios";
import {
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Form
} from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
class LoginPage extends Component {
  state = {
    username: "",
    password: "",
    validated: false,
    faillogin: false,
    failmessage: "No User ID or Password"
  };
  loginHandler = event => {
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
    const { validated } = this.state;
    return (
      
      <div className="Login">
        
        <Form onSubmit={this.loginHandler} noValidate validated={validated}>
          <p className="center_text">MEMBER LOGIN</p>
          <FormGroup controlId="username" size="large">
            <FormLabel>Username</FormLabel>
            <FormControl
              required
              autoFocus
              type="username"
              value={this.state.username}
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
            onSubmit={this.loginHandler}
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
