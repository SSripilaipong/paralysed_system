import React, { Component } from 'react';
import { Button, Form, Row, Col, FormGroup,Modal,FormLabel,FormControl,Container } from "react-bootstrap";
import NavbarComponent from '../components/Navbar'
class ChatPage extends Component {
  render() {
    return (
      <Container>
      <Row>
        <Col sm={2}>sm=2</Col>
        <Col sm>sm=true</Col>
        <Col sm>sm=true</Col>
        <Col sm>sm=true</Col>
      </Row>
      <Row>
      </Row>
    </Container>
    )
  }
}

export default ChatPage;