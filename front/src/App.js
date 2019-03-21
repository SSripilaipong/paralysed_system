import React, { Component } from "react";
import "./App.css";
import { BrowserRouter,Route, Switch } from "react-router-dom";
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import ChatPage from "./containers/ChatPage";
import Chating from "./Chating"

class App extends Component {
  render() {
    return (
      <div style ={{height:'100%'}}>
        <div style ={{height:'100%'}}>
          <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path="/regis" component={RegisterPage} />
            <Route path="/chat" component={ChatPage} />
            <Route path="/chating" component={Chating} />
          </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;