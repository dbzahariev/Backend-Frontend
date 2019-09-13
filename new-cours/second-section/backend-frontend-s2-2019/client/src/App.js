import "./App.css";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import About from "./components/pages/About";
import Alert from "./components/layout/Alert";
import AlertState from "./context/alert/AlertState";
import AuthState from "./context/auth/AuthState";
import ContactState from "./context/contact/ContactState";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
import React from "react";
import Register from "./components/auth/Register";

const App = () => {
  return (
    <ContactState>
      <AlertState>
        <AuthState>
          <Router>
            <div className="App">
              <Navbar />
              <div className="container">
                <Alert />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </div>
          </Router>
        </AuthState>
      </AlertState>
    </ContactState>
  );
};

export default App;
