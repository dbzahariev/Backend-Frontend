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
import NotFound from "./components/NotFound";
import React from "react";
import Register from "./components/auth/Register";
import setAuthToken from "./utils/SetAuthToken";
import PrivateRoute from "./components/routeing/PrivateRoute";

const App = () => {
  setAuthToken(localStorage.getItem("token"));

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
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route component={NotFound} />
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
